import { Component } from '@angular/core';
import { Song } from '../../models/song.model';
import { CommonModule } from '@angular/common';
import { YoutubeLinkToEmbedPipe } from '../../pipes/youtube-link-to-embed.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { LyricsFormatPipe } from '../../pipes/lyrics-format.pipe';
import { FirestoreService } from '../../firestore.service';
import { RouterModule } from '@angular/router';
import { SnackbarComponent } from '../../snackbars/snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Songbook } from '../../models/songbook.model';

@Component({
  selector: 'app-view-lyrics',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSnackBarModule, YoutubeLinkToEmbedPipe, LyricsFormatPipe],
  templateUrl: './view-lyrics.component.html',
  styleUrl: './view-lyrics.component.css'
})
export class ViewLyricsComponent {
  songdata!: Song;
  currentSongbook!: Songbook;

  constructor(private firestoreservice: FirestoreService, public sanitizer: DomSanitizer, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.firestoreservice.selectedSong.subscribe({
      next:(song: Song) => {
        this.songdata = song;
      }
    });

    this.firestoreservice.selectedSongbook.subscribe({
      next:(songbook: Songbook) => {
        this.currentSongbook = songbook;
      }
    });
  }

  onDeleteSong(songId: string, title: string, event: MouseEvent) {
    event.stopPropagation();
    if (confirm("Are you sure you want to delete " + name + "?")) {
      this.firestoreservice.deleteSong(songId, this.currentSongbook.id).subscribe({
        next: () => {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: { type: 'Song', title: title, action: 'deleted' },
            duration: 3000,
            panelClass: ['snackbarWhite']
          });
        },
        error: error => {
          console.error('Error deleting song:', error);
        }
      });
    }
  }
}
