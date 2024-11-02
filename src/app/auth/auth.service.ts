import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from '@angular/fire/auth'
import { Firestore, collection, query, where, getDocs, CollectionReference } from '@angular/fire/firestore';
import { from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;
  uid: string | null = null;

  constructor(private router: Router, private auth: Auth, private db: Firestore) {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        this.uid = localStorage.getItem('uidToken');
        this.auth.onAuthStateChanged(
          () => this.getUid()
        );
      }
    }
  }

  login(email: string, passwd: string) {
    return signInWithEmailAndPassword(this.auth, email, passwd).then(() => {
      return this.auth.currentUser?.getIdToken()
        .then(
          (token:string) => {
            this.token = token;
            localStorage.setItem('token', token);
            const uid = this.getUid();
            if(uid) {
              localStorage.setItem('uidToken', uid); // setting the uid as a token to be referenced
            }
            return true;
          }
        );
    })
    .catch(
      error => {
        console.log(error);
        return false
      }
    )
  }

  logout(): void {
    this.auth.signOut()
      .then(() => {
        this.token = null;
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  signup(email: string, passwd: string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, passwd)
      .catch(error => {
        console.log(error);
        return error;
      })
      .then(() => {
        return 'success';
      })
  }

  getUid(): string | null {
    if (this.auth.currentUser) {
      return this.auth.currentUser.uid;
    } else if (this.uid) {
      return this.uid;
    }
    else {
      console.error('Error fetching UID: User is not authenticated.');
      return null;
    }
  }

  checkEmailExists(email: string): Observable<boolean> {
    return from(
      fetchSignInMethodsForEmail(this.auth, email).then((methods: string[]) => {
        return methods.length > 0; // If there are methods, the email is taken
      })
    );
  }

  isAdmin(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (!user) {
          resolve(false);
          return;
        }
  
        const adminQuery = query(
          collection(this.db, 'administrators') as CollectionReference,
          where('__name__', '==', user.uid)
        );
  
        getDocs(adminQuery)
          .then((snapshot) => {
            resolve(!snapshot.empty); // Returns true if the user is an admin
          })
          .catch((error) => {
            console.error("Error checking admin status:", error);
            resolve(false);
          });
      });
    });
  }  
}
