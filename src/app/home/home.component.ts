import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewLyricsComponent } from '../view-lyrics/view-lyrics.component';
import { ViewSongComponent } from '../view-song/view-song.component';
import { ViewSongBookComponent } from '../view-song-book/view-song-book.component';
import { EditLyricsComponent } from '../edit-lyrics/edit-lyrics.component';
import { EditSongbookComponent } from '../edit-songbook/edit-songbook.component';
import { DataService } from '../data.service';
import { Songbook } from '../models/songbook.model';
import { Song } from '../models/songbook.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ViewLyricsComponent, ViewSongComponent, ViewSongBookComponent, EditLyricsComponent, EditSongbookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DataService]
})
export class HomeComponent {
  songbooks: Songbook[] = [];
  songs: Song[] = [];
  songdata!: Song;
  emptySong: Song = {
    id: 0,
    title: '',
    author: '',
    link: '',
    lyrics: ''
  };

  constructor(private dataservice: DataService) {}

  ngOnInit() {
    this.dataservice.getData().subscribe(songbooks => {
      this.songbooks = songbooks;
    });
  }

  selectSongbook(songbook: Songbook) {
    this.songs = songbook.songs;
    this.songdata = this.emptySong;
  }

  selectSong(song: Song) {
    this.songdata = song;
  }
}
