import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../data.service';
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
  @Input('songsToChild') songIds: string[] = [];
  currentlySelectedSongbook: Songbook | null = null;
  @Output() selectedSong = new EventEmitter<Song>();
  songSubscription!: Subscription;
  songs: Song[] = [];
  currentlySelectedSong: Song | null = null;

  constructor(private dataService: DataService, private firestoreservice: FirestoreService) { }

  ngOnInit() {
    this.firestoreservice.selectedSongbook.subscribe({
      next:(songbook: Songbook) => {
        this.currentlySelectedSongbook = songbook;
        this.songIds = songbook.songIds;

        this.songSubscription = this.firestoreservice.getSongs(this.songIds).subscribe({
          next: (songs) => {
            this.songs = songs;
          },
          error: (err) => {
            console.error('An error occurred while fetching songs:', err);
          }
        });
      }
    });
    console.log(this.songIds);
  }

  ngOnDestroy() {
    if (this.songSubscription) {
      this.songSubscription.unsubscribe();
    }
  }

  selectSong(song: Song) {
    this.selectedSong.emit(song);
    this.currentlySelectedSong = song;
  }
}
