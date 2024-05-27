import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { DataService } from '../data.service';
import { Songbook } from '../models/songbook.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { youtubeLinkValidator } from '../validators/youtube-link-validator';
import { TabspaceDirective } from '../directives/tabspace.directive';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-song',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule, TitleBarComponent, TabspaceDirective],
  templateUrl: './new-song.component.html',
  styleUrl: './new-song.component.css',
  providers: [DataService]
})
export class NewSongComponent {
  songForm!: FormGroup;
  title: string = "Add a new song"
  songbooks: Songbook[] = [];
  selectedSongbookId: string =  "";

  constructor(private fb: FormBuilder, private dataservice: DataService, private http: HttpClient, private router: Router, private snackbar: MatSnackBar) { }

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
              duration: 3000
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
      songbook.songIds.push(Number(newSongId));
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
