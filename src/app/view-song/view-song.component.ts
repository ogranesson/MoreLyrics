import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleshortenerPipe } from '../pipes/titleshortener.pipe';
import { Song } from '../models/songbook.model';

@Component({
  selector: 'app-view-song',
  standalone: true,
  imports: [CommonModule, TitleshortenerPipe],
  templateUrl: './view-song.component.html',
  styleUrl: './view-song.component.css'
})
export class ViewSongComponent {
  @Input('songsToChild') songs: Song[] = [];
  @Output() selectedSong = new EventEmitter<Song>();

  selectSong(song: Song) {
    this.selectedSong.emit(song);
  }
}
