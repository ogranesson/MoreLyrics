import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Songbook } from '../../models/songbook.model';
import { FirestoreService } from '../../firestore.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-song-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-song-book.component.html',
  styleUrl: './view-song-book.component.css',
})
export class ViewSongBookComponent implements OnInit{
  songbooks: Songbook[] = [];
  songbookSubscription!: Subscription;
  currentlySelectedSongbook: Songbook | null = null;

  constructor(private firestoreservice: FirestoreService, private router: Router) {}

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

  allSongs() {
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

    // this.dataservice.addSongbook(songbookFormData).subscribe({
    //   next: (response) => {
    //     location.reload();
    //   },
    //   error: error => {
    //     console.error('Error adding songbook:', error);
    //   }
    // });
  }

  selectSongbook(songbook: Songbook) {
    this.firestoreservice.selectSongbook(songbook.id); // instead of having to use input and output
    this.currentlySelectedSongbook = songbook;
  }
}
