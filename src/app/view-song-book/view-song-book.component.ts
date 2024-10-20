import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Songbook } from '../models/songbook.model';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-song-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-song-book.component.html',
  styleUrl: './view-song-book.component.css',
  providers: [DataService]
})
export class ViewSongBookComponent {
  @Input('songbooksToChild') songbooks: Songbook[] = [];
  @Input('receivedSongbookId') receivedSongbookId: string | null = '';
  @Output() selectedSongbook = new EventEmitter<Songbook>();
  @Output() showAllSongs = new EventEmitter<boolean>();
  currentlySelectedSongbook: Songbook | null = null;

  constructor(private dataservice: DataService, private router: Router) {}

  ngOnChanges() {
    if (this.receivedSongbookId) {
      const songbook = this.songbooks.find(sb => sb.id === this.receivedSongbookId);
      if (songbook) {
        this.currentlySelectedSongbook = songbook;
        this.selectedSongbook.emit(songbook);
      }
    }
  }

  allSongs() {
    this.showAllSongs.emit(true); 
    this.currentlySelectedSongbook = null;
  }

  newSongbook() {
    const songbookFormData = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: 'New songbook',
      description: 'Sparkling new',
      img: 'assets/default.png',
      songIds: [],
    };

    this.dataservice.addSongbook(songbookFormData).subscribe({
      next: (response) => {
        location.reload();
      },
      error: error => {
        console.error('Error adding songbook:', error);
      }
    });
  }

  selectSongbook(songbook: Songbook) {
    this.selectedSongbook.emit(songbook);
    this.currentlySelectedSongbook = songbook;
  }
}
