import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth'
import { Firestore, collection, query, where, getDocs, CollectionReference } from '@angular/fire/firestore';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;

  constructor(private router: Router, private auth: Auth, private db: Firestore) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
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
    } else {
      console.error('Error fetching UID: User is not authenticated.');
      return null;
    }
  }

  checkEmailTaken(email: string): Observable<boolean> {
    const usersRef = collection(this.db, 'users');
    const q = query(usersRef, where('email', '==', email));
    return new Observable<boolean>(observer => {
      getDocs(q)
        .then((snapshot: { empty: any; }) => {
          observer.next(!snapshot.empty);
          observer.complete();
        })
        .catch((error: any) => {
          console.error("Error checking email:", error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.checkEmailTaken(email);
  }

  isAdmin(): Promise<boolean> { // promise needed because getDocs is an async function
    if (!this.auth.currentUser) {
      return Promise.resolve(false);
    }

    const adminQuery = query(collection(this.db, 'administrators') as CollectionReference,
                              where('__name__', '==', this.auth.currentUser.uid)); // querying the admins collection

    return getDocs(adminQuery)
      .then(snapshot => {
        return !snapshot.empty; // returns true if the user is an admin
      })
      .catch(error => {
        console.error("Error checking admin status:", error);
        return false;
      });
  }
}
