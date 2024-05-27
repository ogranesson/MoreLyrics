import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { DataService } from '../data.service';
import { Song } from '../models/song.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { youtubeLinkValidator } from '../validators/youtube-link-validator';
import { TabspaceDirective } from '../directives/tabspace.directive';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-lyrics',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, TabspaceDirective, TitleBarComponent],
  templateUrl: './edit-lyrics.component.html',
  styleUrl: './edit-lyrics.component.css',
  providers: [DataService]
})
export class EditLyricsComponent {
  songForm!: FormGroup;
  title: string = "Add a new song"
  song!: Song;
  songIdThroughParam!: string;

  songTitle: string = "";
  author: string = "";
  link: string = "";
  tuning: string = "";
  capo: string = "";
  lyrics: string = "";

  constructor(private fb: FormBuilder, private dataservice: DataService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['songId']) {
        this.songIdThroughParam = params['songId'];
      }
    });

    this.dataservice.getSong(this.songIdThroughParam).subscribe(song => {
      this.song = song;

      this.songForm = this.fb.group({
        title: [this.song.title, [Validators.required]],
        author: [this.song.author, [Validators.required]],
        tuning: [this.song.tuning, [Validators.required]],
        capo: [this.song.capo, [Validators.required]],
        link: [this.song.link, [youtubeLinkValidator()]],
        lyrics: [this.song.lyrics, [Validators.required]]
      });
    });

  }

  onSubmit() {
    if (this.songForm.valid) {
      const songFormData = {
        id: this.song.id,
        title: this.songForm.value.title,
        author: this.songForm.value.author,
        tuning: this.songForm.value.tuning,
        capo: this.songForm.value.capo,
        link: this.songForm.value.link,
        lyrics: this.songForm.value.lyrics
      };
      this.dataservice.updateSong(songFormData).subscribe({
        next: (response) => {
          this.router.navigate(['/']).then(() => {
            this.snackbar.open(`Song ${this.songForm.value.title} updated`, 'Close', {
              duration: 3000,
              panelClass: ['snackbarWhite']
            });
          });
        },
        error: error => {
          console.error('Error updating song:', error);
        }
      });
    }
  }
}
