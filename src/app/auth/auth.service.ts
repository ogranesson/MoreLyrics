import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;

  constructor(private router: Router, private auth: Auth) {
    if (typeof window !== 'undefined' && window.localStorage) { // defining localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
      }
    }
  }

  login(email: string, passwd: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, passwd)
      .then(() => {
        if (this.auth.currentUser) {
          return this.auth.currentUser.getIdToken().then((token: string) => { // saving current login state
            this.token = token;
            localStorage.setItem('token', token);
            return true;
          });
        } else {
          return false;
        }
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  logout(): void {
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.token != null;
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

  getUid() {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    }

    return null;
  }
}
