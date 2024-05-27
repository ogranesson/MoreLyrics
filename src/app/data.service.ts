import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Songbook } from './models/songbook.model';
import { Song } from './models/song.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getSongbooks(): Observable<any> {
    return this.http.get<Songbook[]>(`${this.url}/songbooks`);
  }

  getSongsByIds(ids: number[]): Observable<Song[]> {
    return forkJoin(ids.map(id => this.getSong(id)));
  }

  getSong(id: number): Observable<Song> {
    console.log(this.http.get<Song>(`${this.url}/songs/${id}`));
    return this.http.get<Song>(`${this.url}/songs/${id}`);
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(`${this.url}/songs`, song);
  }

  updateSongbook(songbook: Songbook): Observable<Songbook> {
    return this.http.put<Songbook>(`${this.url}/songbooks/${songbook.id}`, songbook);
  }
}