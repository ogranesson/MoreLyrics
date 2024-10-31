import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token: string | null = null;

  constructor(private router: Router, private auth: Auth) {
    if (typeof window !== 'undefined' && window.localStorage) {
      if(localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
      }
    }
  }

  signup(email: string, passwd: string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, passwd)
      .catch(error => {
        console.log(error);
        return error;
      })
      .then(() => {
        return 'success';
      });
  }

  login(email: string, passwd: string) {
    return signInWithEmailAndPassword(this.auth, email, passwd)
      .then(() => {
        return this.auth.currentUser?.getIdToken().then((token: string) => {
          this.token = token;
          localStorage.setItem('token', token);  // Token storage not needed in AngularFire but shown for reference
          return true;
        });
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  logout() {
    this.router.navigate(['/login']).then((navigated: boolean) => {
      if (navigated) {
        this.auth.signOut();
        this.token = null;
        localStorage.removeItem('token');
      }
    });
  }

  isLoggedIn(): boolean {
    return this.token != null;
  }
}