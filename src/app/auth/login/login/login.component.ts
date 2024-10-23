import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.invalidLogin = false;
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.passwd;
    this.authService.login(email, password)
      .then((response) => {
        if (!response) {
          this.invalidLogin = true;
        } else {
          this.invalidLogin = false;
          this.router.navigate(['home']);
        }
      });
  }
}