import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Songbook } from '../models/songbook.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TitleshortenerPipe } from '../pipes/titleshortener.pipe';

@Component({
  selector: 'app-all-songbooks',
  standalone: true,
  imports: [CommonModule, TitleshortenerPipe, MatSnackBarModule],
  templateUrl: './all-songbooks.component.html',
  styleUrl: './all-songbooks.component.css',
  providers: [DataService]
})
export class AllSongbooksComponent {
  constructor(private dataservice: DataService, private router: Router, private snackbar: MatSnackBar){}
  songbooks: Songbook[] = [];
  selectedSongbookId: string = '';

  ngOnInit() {
    this.dataservice.getSongbooks().subscribe(songbooks => {
      this.songbooks = songbooks;
    });
  }

  selectSongbook(id: string) {
    this.router.navigate(['/home', id]);
  }

  deleteSongbook(id: string, name: string, event: MouseEvent) {
    event.stopPropagation();
    this.dataservice.deleteSongbook(id).subscribe({
      next: () => {
        this.dataservice.getSongbooks().subscribe(songbooks => {
        this.songbooks = songbooks;

        this.router.navigate(['/']).then(() => {
          this.snackbar.open(`The songbook ${name} has been deleted.`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        });
        })
      }
    })
  }
}
