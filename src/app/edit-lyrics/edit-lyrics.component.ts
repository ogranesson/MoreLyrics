import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleBarComponent } from '../title-bar/title-bar.component';
import { DataService } from '../data.service';
import { Song } from '../models/song.model';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { youtubeLinkValidator } from '../validators/youtube-link-validator';
import { TabspaceDirective } from '../directives/tabspace.directive';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-lyrics',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, TabspaceDirective, TitleBarComponent],
  templateUrl: './edit-lyrics.component.html',
  styleUrl: './edit-lyrics.component.css',
  providers: [DataService]
})
export class EditLyricsComponent {
  songForm!: FormGroup;
  title: string = "Edit song"
  song!: Song;
  songIdThroughParam!: string;

  songTitle: string = "";
  author: string = "";
  link: string = "";
  tuning: string = "";
  capo: string = "";
  lyrics: string = "";

  constructor(private readonly fb: FormBuilder, private readonly dataservice: DataService, private readonly route: ActivatedRoute, private readonly router: Router, private readonly snackbar: MatSnackBar)
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['songId']) {
        this.songIdThroughParam = params['songId'];
      }
    });

    this.dataservice.getSong(this.songIdThroughParam).subscribe(song => {
      this.song = song;

      this.songForm = this.fb.group({
        title: [song.title, [Validators.required]],
        author: [song.author, [Validators.required]],
        tuning: [song.tuning, [Validators.required]],
        capo: [song.capo, [Validators.required]],
        link: [song.link, [youtubeLinkValidator()]],
        lyrics: [song.lyrics, [Validators.required]]
      });
    });

  }

  onSubmit() {
    if (this.songForm.valid) {
      const songFormData = this.songForm.value;
      songFormData.id = this.song.id;
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
