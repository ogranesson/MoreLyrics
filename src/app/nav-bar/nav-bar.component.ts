import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';
import { from, Observable } from 'rxjs';

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

  constructor (private _authservice: AuthService) { } // underscore as naming for private variables

  ngOnInit() {
    this.isAdmin = from(this._authservice.isAdmin()); // from to convert Promise to Observable
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
