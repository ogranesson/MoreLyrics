import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { from, map, Observable } from 'rxjs';
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  public isMobileMenuOpen = false;
  isLoggedIn: boolean = false;
  isAdmin!: Observable<boolean>

  constructor (private _authservice: AuthService, private firestoreservice: FirestoreService) { } // underscore as naming for private variables

  ngOnInit() {
    const uid = this._authservice.getUid();

    this.isAdmin = this.firestoreservice.getAdmin(uid).pipe(
      map(admin => !!admin)
    );
  }

  onLogOut() {
    this._authservice.logout();
  }

  get authservice() {
    return this._authservice;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
