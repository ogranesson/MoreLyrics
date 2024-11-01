import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../snackbars/snackbar/snackbar.component';
import { FirestoreService } from '../../firestore.service';
import { CanComponentDeactivate } from '../../guards/deactivate.guard';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { youtubeLinkValidator } from '../../validators/youtube-link-validator';
import { LyricsFormatPipe } from '../../pipes/lyrics-format.pipe';
import { TabspaceDirective } from '../../directives/tabspace.directive';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Songbook } from '../../models/songbook.model';

@Component({
  selector: 'app-edit-songbook',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule, TabspaceDirective],
  templateUrl: './edit-songbook.component.html',
  styleUrl: './edit-songbook.component.css',
  providers: [LyricsFormatPipe]
})
export class EditSongbookComponent implements OnInit, CanComponentDeactivate {
  songbookForm!: FormGroup;
  title: string = "Edit song"
  songbook!: Songbook;
  songbookIdThroughParam!: string;
  saved: boolean = false;

  lyrics: string = "";

  constructor(private readonly fb: FormBuilder, private lyricsformatpipe: LyricsFormatPipe, private readonly firestoreservice: FirestoreService,
              private readonly route: ActivatedRoute, private readonly router: Router, private readonly snackbar: MatSnackBar)
  {
    this.songbookForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]], 
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['songbookId']) {
        this.songbookIdThroughParam = params['songbookId'];
      }
    });

    this.firestoreservice.getSongbook(this.songbookIdThroughParam).subscribe(songbook => {
      this.songbookForm = this.fb.group({
        name: [songbook.name, [Validators.required]],
        description: [songbook.description, [Validators.required]],
      });
    });

  }

  onSubmit() {
    if (this.songbookForm.valid) {
      this.saved = true;
      this.songbook = { ...this.songbookForm.value }; // object spread syntax
      this.firestoreservice.updateSongbook(this.songbook, this.songbookIdThroughParam).subscribe({
        next: () => { // updateSong being an Observable completes after this next(), while the Subject doesn't do so automatically
          this.router.navigate(['/home']).then(() => {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: { type: 'Songbook', title: this.songbookForm.value.name, action: 'updated' },
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

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean { // same type as interface defined in guard
    if (!this.saved) {
      return confirm('Do you want to discard the changes made?');
    }
    return true;
  }
}
