import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Songbook } from './models/songbook.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000/songbooks';
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<Songbook[]>(this.url);
  }
}