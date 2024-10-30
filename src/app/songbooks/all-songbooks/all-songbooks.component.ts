import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FirestoreService } from '../../firestore.service';
import { Songbook } from '../../models/songbook.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TitleshortenerPipe } from '../../pipes/titleshortener.pipe';
import { Subscription } from 'rxjs';
import { SnackbarComponent } from '../../snackbars/snackbar/snackbar.component';

@Component({
  selector: 'app-all-songbooks',
  standalone: true,
  imports: [CommonModule, TitleshortenerPipe, MatSnackBarModule],
  templateUrl: './all-songbooks.component.html',
  styleUrl: './all-songbooks.component.css',
})
export class AllSongbooksComponent implements OnDestroy {
  constructor(private firestoreservice: FirestoreService, private router: Router, private snackbar: MatSnackBar){}
  songbooks: Songbook[] = [];
  selectedSongbookId: string = '';
  songbookSubscription!: Subscription
  title: string = "All songbooks"

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
  }

  selectSongbook(songbookId: string) {
    this.firestoreservice.selectSongbook(songbookId);
    this.router.navigate(['/home']);
  }

  deleteSongbook(id: string, name: string, event: MouseEvent) {
    event.stopPropagation();
    if (confirm("Are you sure you want to delete " + name + "?")) {
      this.firestoreservice.deleteSongbook(id).subscribe({
        next: () => {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: { type: 'Songbook', title: name, action: 'deleted' },
            duration: 3000,
            panelClass: ['snackbarWhite']
          });
        },
        error: error => {
          console.error('Error deleting songbook:', error);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.songbookSubscription) {
      this.songbookSubscription.unsubscribe();
    }
  }
}
