import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) { }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.passwd;
    this.authService.signup(email, password)
      .then((res) => {
        if (res == 'success') {
          this.router.navigate(['login']);
        } else {
          alert(res);
        }
    });
  }
}