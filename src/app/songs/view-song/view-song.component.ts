import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../firestore.service';
import { TitleshortenerPipe } from '../../pipes/titleshortener.pipe';
import { Subscription } from 'rxjs';
import { Song } from '../../models/song.model';
import { Songbook } from '../../models/songbook.model';

@Component({
  selector: 'app-view-song',
  standalone: true,
  imports: [CommonModule, TitleshortenerPipe],
  templateUrl: './view-song.component.html',
  styleUrl: './view-song.component.css'
})
export class ViewSongComponent {
  songIds: string[] = [];
  currentlySelectedSongbook: Songbook | null = null;
  songSubscription!: Subscription;
  songs: Song[] = [];
  currentlySelectedSong: Song | null = null;

  constructor(private firestoreservice: FirestoreService) { }

  ngOnInit() {
    this.firestoreservice.selectedSongbook.subscribe({
      next:(songbook: Songbook) => {
        this.currentlySelectedSongbook = songbook;
        this.songIds = songbook.songIds;

        if (this.songIds.length == 0) {
          console.log('empty');
          this.songs = [];
        } else {

        this.songSubscription = this.firestoreservice.getSongs(this.songIds).subscribe({
          next: (songs) => {
            this.songs = songs;
          },
          error: (err) => {
            console.error('An error occurred while fetching songs:', err);
          }
        });
      }
      }
    });
  }

  selectSong(song: Song) {
    console.log(song);
    this.firestoreservice.selectSong(song.id);
    this.currentlySelectedSong = song;
  }

  ngOnDestroy() {
    if (this.songSubscription) {
      this.songSubscription.unsubscribe();
    }
  }
}
