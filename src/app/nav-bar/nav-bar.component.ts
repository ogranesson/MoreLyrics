import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  public isMobileMenuOpen = false;
  isLoggedIn: boolean = false;

  constructor (private _authservice: AuthService) { } // underscore for private variables

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
