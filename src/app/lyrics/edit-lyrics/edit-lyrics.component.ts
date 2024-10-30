import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SongUpdatedComponent } from '../../snackbars/song-updated/song-updated.component';
import { DataService } from '../../data.service';
import { FirestoreService } from '../../firestore.service';
import { Song } from '../../models/song.model';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { youtubeLinkValidator } from '../../validators/youtube-link-validator';
import { LyricsFormatPipe } from '../../pipes/lyrics-format.pipe';
import { TabspaceDirective } from '../../directives/tabspace.directive';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-lyrics',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, TabspaceDirective],
  templateUrl: './edit-lyrics.component.html',
  styleUrl: './edit-lyrics.component.css',
  providers: [DataService, LyricsFormatPipe]
})
export class EditLyricsComponent {
  songForm!: FormGroup;
  title: string = "Edit song"
  song!: Song;
  songIdThroughParam!: string;

  lyrics: string = "";

  constructor(private readonly fb: FormBuilder, private lyricsformatpipe: LyricsFormatPipe, private readonly firestoreservice: FirestoreService, private readonly route: ActivatedRoute, private readonly router: Router, private readonly snackbar: MatSnackBar)
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

    this.firestoreservice.getSong(this.songIdThroughParam).subscribe(song => {
      this.song = song;

      this.lyrics = this.lyricsformatpipe.transformText(this.song.lyrics);

      this.songForm = this.fb.group({
        title: [song.title, [Validators.required]],
        author: [song.author, [Validators.required]],
        tuning: [song.tuning, [Validators.required]],
        capo: [song.capo, [Validators.required]],
        link: [song.link, [youtubeLinkValidator()]],
        lyrics: [this.lyrics, [Validators.required]]
      });
    });

  }

  onSubmit() {
    if (this.songForm.valid) {
      this.song = { ...this.songForm.value };
      this.firestoreservice.updateSong(this.song, this.songIdThroughParam).subscribe({
        next: () => { // updateSong being an Observable completes after this next(), while the Subject doesn't do so automatically
          this.router.navigate(['/']).then(() => {
            this.snackbar.openFromComponent(SongUpdatedComponent, {
              data: { title: this.songForm.value.title },
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
