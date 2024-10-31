import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbars/snackbar/snackbar.component';
import { DataService } from '../../data.service';
import { FirestoreService } from '../../firestore.service';
import { Songbook } from '../../models/songbook.model';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { youtubeLinkValidator } from '../../validators/youtube-link-validator';
import { TabspaceDirective } from '../../directives/tabspace.directive';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LyricsFormatPipe } from '../../pipes/lyrics-format.pipe';
import { Observable } from 'rxjs';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TabspaceDirective],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css',
  providers: [DataService]
})
export class NewSongComponent {
  songForm!: FormGroup;
  song!: Song;
  title: string = "Add a new song"
  songbooks: Songbook[] = [];
  selectedSongbookId: string =  "";
  saved: boolean = false;

  constructor(private readonly fb: FormBuilder, private readonly dataservice: DataService, private firestoreservice: FirestoreService,
              private readonly router: Router, private readonly snackbar: MatSnackBar) 
  {
    this.songForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]], 
      tuning: ['', [Validators.required]],
      capo: ['', [Validators.required]],
      link: ['', [youtubeLinkValidator()]],
      lyrics: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.songForm.valid) {
      this.saved = true;

      this.song = { ...this.songForm.value };

      this.firestoreservice.createSong(this.song).subscribe({
        next: () => {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: { type: 'Song', title: this.songForm.value.name, action: 'created' },
            duration: 3000,
            panelClass: ['snackbarWhite']
          });
        },
        error: (error) => {
          console.error('Error creating song:', error);
        }
      });
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean { // same type as interface defined in guard
    if (!this.saved) {
      return confirm('Do you want to discard the changes made?');
    }
    return true;
  }
}
