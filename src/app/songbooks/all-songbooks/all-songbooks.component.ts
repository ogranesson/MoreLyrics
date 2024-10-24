import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FirestoreService } from '../../firestore.service';
import { Songbook } from '../../models/songbook.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TitleshortenerPipe } from '../../pipes/titleshortener.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-songbooks',
  standalone: true,
  imports: [CommonModule, TitleshortenerPipe, MatSnackBarModule],
  templateUrl: './all-songbooks.component.html',
  styleUrl: './all-songbooks.component.css',
})
export class AllSongbooksComponent {
  constructor(private firestoreservice: FirestoreService, private router: Router, private snackbar: MatSnackBar){}
  songbooks: Songbook[] = [];
  selectedSongbookId: string = '';
  songbookSubscription!: Subscription
  title: string = "All songbooks"

  ngOnInit() {
    this.songbookSubscription = this.firestoreservice.getSongbooks().subscribe({
      next: (songbooks) => {
        this.songbooks = songbooks;
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
    // this.dataservice.deleteSongbook(id).subscribe({
    //   next: () => {
    //     this.dataservice.getSongbooks().subscribe(songbooks => {
    //     this.songbooks = songbooks;

    //     this.router.navigate(['/']).then(() => {
    //       this.snackbar.open(`The songbook ${name} has been deleted.`, 'Close', {
    //         duration: 3000,
    //         verticalPosition: 'top',
    //         horizontalPosition: 'center'
    //       });
    //     });
    //     })
    //   }
    // })
  }
}
