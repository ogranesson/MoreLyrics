import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Songbook } from '../../models/songbook.model';
import { FirestoreService } from '../../firestore.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbars/snackbar/snackbar.component';

@Component({
  selector: 'app-view-song-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-song-book.component.html',
  styleUrl: './view-song-book.component.css',
})
export class ViewSongBookComponent implements OnInit, OnDestroy{
  songbooks: Songbook[] = [];
  songbookSubscription!: Subscription;
  currentlySelectedSongbook: Songbook | null = null;

  constructor(private firestoreservice: FirestoreService, private router: Router, private readonly snackbar: MatSnackBar) {}

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
    let newName = prompt("What should the new songbook be called?", "New songbook");

    if (newName) {
      const newSongbook: Songbook = {
        id: "",
        name: newName,
        description: "",
        img: "assets/default.png",
        songIds: []
      };

      this.firestoreservice.createSongbook(newSongbook).subscribe({
        next: () => {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: { type: 'Songbook', title: newName, action: 'created' },
            duration: 3000,
            panelClass: ['snackbarWhite']
          });
        }
      });
    }
    else {
      return;
    }
  }

  selectSongbook(songbook: Songbook) {
    this.firestoreservice.selectSongbook(songbook.id); // instead of having to use input and output
    this.currentlySelectedSongbook = songbook;
  }

  ngOnDestroy() {
    if(this.songbookSubscription) {
      this.songbookSubscription.unsubscribe()
    }
  }
}
