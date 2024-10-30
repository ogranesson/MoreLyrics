import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'; // needed to interpret as snackbar

@Component({
  selector: 'app-song-updated',
  templateUrl: './song-updated.component.html',
  styleUrls: ['./song-updated.component.css']
})
export class SongUpdatedComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { title: string },
              private snackBarRef: MatSnackBarRef<SongUpdatedComponent>) {}
  
  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}
