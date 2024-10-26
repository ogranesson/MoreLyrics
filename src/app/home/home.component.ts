import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ViewLyricsComponent } from '../lyrics/view-lyrics/view-lyrics.component';
import { ViewSongComponent } from '../songs/view-song/view-song.component';
import { ViewSongBookComponent } from '../songbooks/view-song-book/view-song-book.component';
import { EditLyricsComponent } from '../lyrics/edit-lyrics/edit-lyrics.component';
import { EditSongbookComponent } from '../songbooks/edit-songbook/edit-songbook.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ViewLyricsComponent, ViewSongComponent, ViewSongBookComponent, EditLyricsComponent, EditSongbookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  title: string = "Your songbooks"
}
