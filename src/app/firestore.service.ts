import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
}
