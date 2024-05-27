import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { TitleshortenerPipe } from '../pipes/titleshortener.pipe';
import { Song } from '../models/song.model';

@Component({
  selector: 'app-view-song',
  standalone: true,
  imports: [CommonModule, TitleshortenerPipe],
  templateUrl: './view-song.component.html',
  styleUrl: './view-song.component.css'
})
export class ViewSongComponent {
  @Input('songsToChild') songIds: number[] = [];
  @Output() selectedSong = new EventEmitter<Song>();
  songs: Song[] = [];
  currentlySelectedSong: Song | null = null;

  constructor(private dataService: DataService) { }

  ngOnChanges() {
    if (this.songIds.length > 0) {
      this.dataService.getSongsByIds(this.songIds).subscribe({
        next: songs => {
          this.songs = songs;
        },
        error: error => {
          console.error('Error fetching songs:', error);
        }
      });
    }
  }

  selectSong(song: Song) {
    this.selectedSong.emit(song);
    this.currentlySelectedSong = song;
  }
}
