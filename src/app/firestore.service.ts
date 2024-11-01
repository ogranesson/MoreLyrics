import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc, updateDoc, deleteDoc, query, where, arrayUnion, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject, from, combineLatest, map, filter, switchMap } from 'rxjs';
import { Song } from './models/song.model';
import { Songbook } from './models/songbook.model';
import { Admin } from './models/admin.model';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private db: Firestore, private auth: Auth) {}

  selectedSongbook = new Subject<Songbook>();
  selectedSong = new Subject<Song>();

  // ----------------- Songbooks ------------------- 

  getSongbooks(): Observable<Songbook[]> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          const songbooksRef = collection(this.db, 'songbooks');
          const songbooksQuery = query(songbooksRef, where('uid', '==', user.uid));
          return collectionData(songbooksQuery, { idField: 'id' }) as Observable<Songbook[]>;
        } else {
          throw new Error('User is not authenticated');
        }
      })
    );
  }

  getSongbook(songbookId: string): Observable<Songbook> {
    const songbookRef = doc(this.db, `songbooks/${songbookId}`) as DocumentReference<Songbook>;
    return docData(songbookRef, { idField: "id" }).pipe(
      filter((songbook): songbook is Songbook => !!songbook)
    );
  }

  selectSongbook(songbookId: string) {
    const songbookRef = doc(this.db, `songbooks/${songbookId}`) as DocumentReference<Songbook>;
    docData(songbookRef, { idField: "id" }).subscribe((songbook: Songbook | undefined) => {
      if (songbook) {
        this.selectedSongbook.next(songbook);
      } else {
        console.error('Songbook not found');
      }
    });
  }

  createSongbook(songbook: Songbook): Observable<void> {
    const songbookRef = doc(collection(this.db, 'songbooks'));
    const songbookId = songbookRef.id;

    return new Observable<void>((observer) => {
      setDoc(songbookRef, { ...songbook, id: songbookId })
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteSongbook(id: string): Observable<void> {
    const songbookRef = doc(this.db, `songbooks/${id}`) as DocumentReference<Songbook>;
    return from(deleteDoc(songbookRef));
  }

  updateSongbook(songbook: Songbook, songbookId: string): Observable<void> {
    const songbookRef = doc(this.db, `songbooks/${songbookId}`) as DocumentReference<Songbook>;
    return from(updateDoc(songbookRef, { ...songbook }));
  }

  // ----------------- Songs ------------------- 

  getSongs(songIds: string[]): Observable<Song[]> {
    return combineLatest(songIds.map(id => this.getSong(id))).pipe(
      map(songs => songs.filter((song): song is Song => song !== undefined))
    );
  }

  getSong(songId: string): Observable<Song> {
    const songRef = doc(this.db, `songs/${songId}`) as DocumentReference<Song>;
    return docData(songRef, { idField: "id" }).pipe(
      filter((song): song is Song => !!song)
    );
  }

  selectSong(songId: string) {
    const songRef = doc(this.db, `songs/${songId}`) as DocumentReference<Song>;
    docData(songRef, { idField: "id" }).subscribe((song: Song | undefined) => {
      if (song) {
        this.selectedSong.next(song);
      } else {
        console.error('Song not found');
      }
    });
  }

  updateSong(song: Song, songId: string): Observable<void> {
    const songRef = doc(this.db, `songs/${songId}`) as DocumentReference<Song>;
    return from(updateDoc(songRef, { ...song }));
  }

  createSong(song: Song): Observable<string> {
    const songRef = doc(collection(this.db, 'songs'));
    const songId = songRef.id;
    
    return new Observable<string>((res) => {
      setDoc(songRef, { ...song, id: songId })
        .then(() => {
          res.next(songId);
          res.complete();
        })
        .catch((error) => {
          res.error(error);
        });
    });
  }

  addSongIdToSongbook(songbookId: string, songId: string): Observable<void> {
    const songbookRef = doc(this.db, `songbooks/${songbookId}`);
    return from(
      updateDoc(songbookRef, {
        songIds: arrayUnion(songId),
      })
    );
  }

  // ----------------- Others ------------------- 

  getAdmins(uid: string | null): Observable<Admin> {
    const adminRef = doc(this.db, `administrators/${uid}`) as DocumentReference<Admin>;
    return docData(adminRef) as Observable<Admin>;
  }
}
