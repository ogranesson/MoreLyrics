import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Songbook } from '../models/songbook.model';

@Component({
  selector: 'app-view-song-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-song-book.component.html',
  styleUrl: './view-song-book.component.css'
})
export class ViewSongBookComponent {
  @Input('songbooksToChild') songbooks: Songbook[] = [];
  @Input('receivedSongbookId') receivedSongbookId: string | null = '';
  @Output() selectedSongbook = new EventEmitter<Songbook>();
  currentlySelectedSongbook: Songbook | null = null;

  ngOnChanges() {
    if (this.receivedSongbookId) {
      const songbook = this.songbooks.find(sb => sb.id === this.receivedSongbookId);
      if (songbook) {
        this.currentlySelectedSongbook = songbook;
        this.selectedSongbook.emit(songbook);
      }
    }
  }

  selectSongbook(songbook: Songbook) {
    this.selectedSongbook.emit(songbook);
    this.currentlySelectedSongbook = songbook;
  }
}
