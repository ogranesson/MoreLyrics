import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { ViewLyricsComponent } from '../view-lyrics/view-lyrics.component';
import { ViewSongComponent } from '../view-song/view-song.component';
import { ViewSongBookComponent } from '../view-song-book/view-song-book.component';
import { EditLyricsComponent } from '../edit-lyrics/edit-lyrics.component';
import { EditSongbookComponent } from '../edit-songbook/edit-songbook.component';
import { DataService } from '../data.service';
import { Songbook } from '../models/songbook.model';
import { Song } from '../models/song.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TitleBarComponent, ViewLyricsComponent, ViewSongComponent, ViewSongBookComponent, EditLyricsComponent, EditSongbookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DataService]
})
export class HomeComponent {
  title: string = "Your songbooks"
  songbooks: Songbook[] = [];
  songIds: number[] = [];
  songdata!: Song;
  emptySong: Song = {
    id: 0,
    title: '',
    author: '',
    link: '',
    tuning: '',
    capo: '',
    lyrics: ''
  };

  constructor(private dataservice: DataService) {}

  ngOnInit() {
    this.dataservice.getSongbooks().subscribe(songbooks => {
      this.songbooks = songbooks;
    });
  }
  
  selectSongbook(songbook: Songbook) {
    this.songIds = songbook.songIds;
    this.songdata = this.emptySong;
  }

  selectSong(song: Song) {
    this.songdata = song;
  }
}