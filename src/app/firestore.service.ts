import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, docData, DocumentReference, doc, updateDoc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, Subject, map, combineLatest, filter, from } from 'rxjs';
import { Song } from './models/song.model';
import { Songbook } from './models/songbook.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: Firestore) { }

  selectedSongbook = new Subject<Songbook>();
  selectedSong = new Subject<Song>();

  getSongbooks(): Observable<Songbook[]> {
    return collectionData<Songbook>(
      collection(this.db, 'songbooks') as CollectionReference<Songbook>,
      {idField: "id"}
    );
  }

  // forkJoin returns an Observable emitting an array of Songs when all the Song observables are complete
  // but combineLatest doesn't need the Song observables to complete, so no need to take(1)
  getSongs(songIds: string[]): Observable<Song[]> {
    return combineLatest(songIds.map(id => this.getSong(id.toString()))).pipe(
      map(songs => songs.filter((song): song is Song => song !== undefined)) // filtering the undefined calls out
    );
  }
  
  getSong(songId: string): Observable<Song> {
    return docData<Song>( // docData can return undefined, so have to cover for that
      doc(this.db, '/songs/' + songId) as DocumentReference<Song>,
      {idField: "id"}).pipe(
        filter((song): song is Song => !!song) // Only emit if song is not undefined
    );
  }
  
  selectSongbook(songbookId: string) {
    const songbookReference = doc(this.db, '/songbooks/' + songbookId) as DocumentReference<Songbook>;

    docData<Songbook>(songbookReference, {idField: "id"}).subscribe((songbook: Songbook | undefined) => { // subscribing for real-time updates in both components
      if (songbook) {
        // Only emit if the songbook is not undefined
        this.selectedSongbook.next(songbook);
      } else {
        console.error('Songbook not found');
      }
    });
  }

  selectSong(songId: string) {
    const songReference = doc(this.db, '/songs/' + songId) as DocumentReference<Song>;
    
    docData<Song>(songReference, {idField: "id"}).subscribe((song: Song | undefined) => { // subscribing for real-time updates in both components
      if (song) {
        this.selectedSong.next(song);
      } else {
        console.error('Song not found');
      }
    });
  }

  updateSong(song: Song, songId: string): Observable<void> {
    const songReference = doc(this.db, `songs/${songId}`) as DocumentReference<Song>;
    return from(updateDoc(songReference, { ...song }));
  }

  createSongbook(newSongbook: Songbook): Observable<void> {
    const newID = doc(collection(this.db, 'id')).id;
    const ref = doc(this.db, 'songbooks/'+newID);
    return from(setDoc(ref, newSongbook));
  }

  deleteSongbook(id: string): Observable<void> {
    const bookRef = doc(this.db, 'songbooks/'+id) as DocumentReference<Songbook>;
    return from(deleteDoc(bookRef));
  }
}
