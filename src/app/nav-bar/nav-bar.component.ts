import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { RouterModule } from '@angular/router';

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
  isAdmin!: Promise<boolean>

  constructor (private _authservice: AuthService) { } // underscore for private variables

  ngOnInit() {
    this.isAdmin = this._authservice.isAdmin();
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
