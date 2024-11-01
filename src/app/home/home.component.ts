import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ViewLyricsComponent } from './view-lyrics/view-lyrics.component';
import { ViewSongComponent } from './view-song/view-song.component';
import { ViewSongBookComponent } from './view-song-book/view-song-book.component';
import { EditSongComponent } from '../songs/edit-song/edit-song.component';
import { EditSongbookComponent } from '../songbooks/edit-songbook/edit-songbook.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ViewLyricsComponent, ViewSongComponent, ViewSongBookComponent, EditSongComponent, EditSongbookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  title: string = "Your songbooks"
}
