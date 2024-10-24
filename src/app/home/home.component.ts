import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ViewLyricsComponent } from '../lyrics/view-lyrics/view-lyrics.component';
import { ViewSongComponent } from '../songs/view-song/view-song.component';
import { ViewSongBookComponent } from '../songbooks/view-song-book/view-song-book.component';
import { EditLyricsComponent } from '../lyrics/edit-lyrics/edit-lyrics.component';
import { EditSongbookComponent } from '../songbooks/edit-songbook/edit-songbook.component';
import { DataService } from '../data.service';
import { FirestoreService } from '../firestore.service';
import { Songbook } from '../models/songbook.model';
import { Song } from '../models/song.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ViewLyricsComponent, ViewSongComponent, ViewSongBookComponent, EditLyricsComponent, EditSongbookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DataService]
})
export class HomeComponent {
  title: string = "Your songbooks"
  songbooks: Songbook[] = [];
  songbookSubscription!: Subscription;
  songIds: string[] = [];
  songdata!: Song;
  selectedSongbook: Songbook | null = null;
  songbookIdThroughParam: string | null = '';
  emptySong: Song = {
    id: '',
    title: '',
    author: '',
    link: '',
    tuning: '',
    capo: '',
    lyrics: ''
  };

  constructor(private dataservice: DataService, private firestoreservice: FirestoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   if (params['songbookId']) {
    //     this.songbookIdThroughParam = params['songbookId'];
    //   } else {
    //     this.songbookIdThroughParam = null;
    //   }
    // });
    // this.dataservice.getSongbooks().subscribe(songbooks => {
    //   this.songbooks = songbooks;
    // });

    this.songbookSubscription = this.firestoreservice.getSongbooks().subscribe({
      next: (songbooks) => {
        this.songbooks = songbooks;
      },
      error: (err) => {
        console.error('An error occurred while fetching songbooks:', err);
      }
    });
  }
  
  selectSongbook(songbook: Songbook) {
    this.selectedSongbook = songbook;
    this.songIds = songbook.songIds;
    this.songdata = this.emptySong;
  }

  selectSong(song: Song) {
    this.songdata = song;
  }

  onShowAllSongs(showAll: boolean) {
    if (showAll) {
      this.dataservice.getAllSongIds().subscribe(
        (ids: string[]) => {
          this.songIds = ids;
          this.selectedSongbook = null;
        },
        error => {
          console.error('Failed to get song IDs', error);
        }
      );
    }
  }
}
