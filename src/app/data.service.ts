import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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

  getAllSongIds(): Observable<string[]> {
    return this.http.get<Song[]>(`${this.url}/songs`).pipe(
      map(songs => songs.map(song => song.id))
    );
  }

  getSongsByIds(ids: string[]): Observable<Song[]> {
    return forkJoin(ids.map(id => this.getSong(id.toString())));
  }

  getSong(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.url}/songs/${id}`);
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(`${this.url}/songs`, song);
  }

  getSongbook(id: string): Observable<Songbook> {
    return this.http.get<Songbook>(`${this.url}/songbooks/${id}`);
  }

  addSongbook(songbook: Songbook): Observable<Songbook> {
    return this.http.post<Songbook>(`${this.url}/songbooks`, songbook);
  }

  updateSong(song: Song): Observable<Song> {
    return this.http.put<Song>(`${this.url}/songs/${song.id}`, song);
  }

  updateSongbook(songbook: Songbook): Observable<Songbook> {
    return this.http.put<Songbook>(`${this.url}/songbooks/${songbook.id}`, songbook);
  }

  deleteSongbook(id: string): Observable<any> {
    return this.http.delete<Songbook>(`${this.url}/songbooks/${id}`);
  }
}