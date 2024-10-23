import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, docData, DocumentReference, doc } from '@angular/fire/firestore';
import { filter, Observable, map, take, combineLatest } from 'rxjs';
import { Song } from './models/song.model';
import { Songbook } from './models/songbook.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: Firestore) { }

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
  
  getSong(songId: string): Observable<Song | undefined> {
    return docData<Song>(
      doc(this.db, '/songs/' + songId) as DocumentReference<Song>
    );
  }
  
}
