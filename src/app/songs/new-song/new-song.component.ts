import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../data.service';
import { Songbook } from '../../models/songbook.model';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { youtubeLinkValidator } from '../../validators/youtube-link-validator';
import { TabspaceDirective } from '../../directives/tabspace.directive';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  title: string = "Add a new song"
  songbooks: Songbook[] = [];
  selectedSongbookId: string =  "";

  constructor(private readonly fb: FormBuilder, private readonly dataservice: DataService, private readonly router: Router, private readonly snackbar: MatSnackBar) { }

  ngOnInit() {
    this.songForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      selectedSongbookId: [''],
      tuning: ['', [Validators.required]],
      capo: ['', [Validators.required]],
      link: ['', [youtubeLinkValidator()]],
      lyrics: ['', [Validators.required]]
    });

    this.dataservice.getSongbooks().subscribe(songbooks => {
      this.songbooks = songbooks;
    });
  }

  onSubmit() {
    if (this.songForm.valid) {
      const newId = this.generateRandomId().toString();
      const songName = this.songForm.value.title;
      this.selectedSongbookId = this.songForm.value.selectedSongbookId;

      const songFormData = {
        id: newId,
        title: this.songForm.value.title,
        author: this.songForm.value.author,
        tuning: this.songForm.value.tuning,
        capo: this.songForm.value.capo,
        link: this.songForm.value.link,
        lyrics: this.songForm.value.lyrics
      };
      this.dataservice.addSong(songFormData).subscribe({
        next: (response) => {
          this.updateSongbook(newId);
          this.router.navigate(['/']).then(() => {
            this.snackbar.open(`New song ${songName} added`, 'Close', {
              duration: 3000,
              panelClass: ['snackbarWhite']
            });
          });
        },
        error: error => {
          console.error('Error adding song:', error);
        }
      });
    }
  }

  updateSongbook(newSongId: string) {
    const songbook = this.songbooks.find(sb => sb.id === this.selectedSongbookId);
    if (songbook) {
      songbook.songIds.push(newSongId);
      this.dataservice.updateSongbook(songbook).subscribe({
        next: updatedSongbook => {
          console.log('Songbook updated successfully', updatedSongbook);
        },
        error: error => {
          console.error('Error updating songbook:', error);
        }
      });
    }
  }

  generateRandomId() {
    return Math.floor(Math.random() * 100000);
  }
}
