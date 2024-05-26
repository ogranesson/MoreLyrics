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
  @Input('songbooksToChild') songbooks: Songbook[] = []
  @Output() selectedSongbook = new EventEmitter<Songbook>();

  selectSongbook(songbook: Songbook) {
    this.selectedSongbook.emit(songbook); // Emit the selected songbook when clicked
  }
}
