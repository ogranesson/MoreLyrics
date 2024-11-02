import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Songbook } from '../../models/songbook.model';
import { FirestoreService } from '../../firestore.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbars/snackbar/snackbar.component';
import { FormsModule } from '@angular/forms';
import { SongbookFilterPipe } from '../../pipes/songbook-filter.pipe';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-view-song-book',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, SongbookFilterPipe],
  templateUrl: './view-song-book.component.html',
  styleUrl: './view-song-book.component.css',
})
export class ViewSongBookComponent implements OnInit, OnDestroy{
  songbooks: Songbook[] = [];
  songbookSubscription!: Subscription;
  selectedSongbookSubscription!: Subscription;
  currentlySelectedSongbook: Songbook | null = null;
  search: string = "";

  constructor(private firestoreservice: FirestoreService, private router: Router, private readonly snackbar: MatSnackBar, private authservice: AuthService) {}

  ngOnInit() {
    this.songbookSubscription = this.firestoreservice.getSongbooks().subscribe({
      next: (songbooks) => {
        this.songbooks = songbooks;
        this.songbooks.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: (err) => {
        console.error('An error occurred while fetching songbooks:', err);
      }
    });

    this.selectedSongbookSubscription = this.firestoreservice.selectedSongbook.subscribe(songbook => {
      this.currentlySelectedSongbook = songbook;
    });
  }

  allSongs() {
    this.currentlySelectedSongbook = null;
  }

  newSongbook() {
    let newName = prompt("What should the new songbook be called?", "New songbook");

    if (newName) {
      const userId = this.authservice.getUid();

      if (userId) {
        const newSongbook: Songbook = {
          id: "",
          userID: userId,
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
  }

  selectSongbook(songbook: Songbook) {
    this.firestoreservice.selectSongbook(songbook.id); // instead of having to use input and output
    this.currentlySelectedSongbook = songbook;
  }

  ngOnDestroy() {
    if(this.songbookSubscription) {
      this.songbookSubscription.unsubscribe()
    }

    if(this.selectedSongbookSubscription) {
      this.selectedSongbookSubscription.unsubscribe()
    }
  }
}
