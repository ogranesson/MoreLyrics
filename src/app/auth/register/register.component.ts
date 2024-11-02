import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor( private authService: AuthService, private router: Router, private fb: FormBuilder ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], [this.emailTakenValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  emailTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.authService.checkEmailTaken(control.value).pipe(
        map(isTaken => (isTaken ? { emailTaken: true } : null))
      );
    };
  }

  onSignup() {
    if (this.registerForm.valid) {
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      this.authService.signup(email, password)
        .then(res => {
          if (res === 'success') {
            this.router.navigate(['login']);
          } else {
            alert(res);
          }
        });
    }
  }
}