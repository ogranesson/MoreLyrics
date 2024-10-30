import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar'; // needed to interpret as snackbar

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { type: string, title: string, action: string },
              private snackBarRef: MatSnackBarRef<SnackbarComponent>) {}
  
  closeSnackbar() {
    this.snackBarRef.dismiss();
  }
}
