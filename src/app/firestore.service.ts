import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc, updateDoc, deleteDoc, query, where, arrayUnion, DocumentReference, CollectionReference, arrayRemove } from '@angular/fire/firestore';
import { Observable, Subject, from, combineLatest, map, filter, switchMap, of, catchError } from 'rxjs';
import { Song } from './models/song.model';
import { Songbook } from './models/songbook.model';
import { Admin } from './models/admin.model';
import { Auth, authState } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private db: Firestore, private auth: Auth, private authService: AuthService) {}

  selectedSongbook = new Subject<Songbook>();
  selectedSong = new Subject<Song>();

  // ----------------- Songbooks ------------------- 

  getSongbooks(): Observable<Songbook[]> {
    // Check if the user is an admin
    return from(this.authService.isAdmin()).pipe(
      switchMap(isAdmin => {
        if (isAdmin) {
          // If the user is an admin, fetch all songbooks
          const songbooksRef = collection(this.db, 'songbooks') as CollectionReference<Songbook>;
          return collectionData(songbooksRef, { idField: 'id' });
        } else {
          try {
            const userUid = this.authService.getUid();
            if (!userUid) {
              throw new Error('User UID is not available.');
            }
            const userSongbooksRef = query(
              collection(this.db, 'songbooks') as CollectionReference<Songbook>,
              where('userID', '==', userUid)
            );
            return collectionData(userSongbooksRef, { idField: 'id' });
          } catch (error) {
            console.error("Error fetching UID:", error);
            return of([]); // Return an empty array in case of an error
          }
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

  deleteSong(songId: string, songbookId: string): Observable<void> {
    const songRef = doc(this.db, `songs/${songId}`) as DocumentReference<Song>;
    return this.removeSongIdFromSongbook(songbookId, songId).pipe( // pipe method is used to compose and apply multiple operators to an Observable
      switchMap(() => from(deleteDoc(songRef))) // switchMap is used to chain the two asynchronous operations
    );
  }

  removeSongIdFromSongbook(songbookId: string, songId: string): Observable<void> {
    const songbookRef = doc(this.db, `songbooks/${songbookId}`);
    return from(
      updateDoc(songbookRef, {
        songIds: arrayRemove(songId),
      })
    );
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

  getAdmin(uid: string | null) { // if current user is admin, returns Observable, otherwise undefined
    return docData<Admin>(
      doc(this.db, 'administrators/' + uid) as DocumentReference<Admin>);
  }
}
