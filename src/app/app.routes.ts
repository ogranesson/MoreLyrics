import { Routes } from '@angular/router';
import { loggedInGuard } from './guards/logged-in.guard';
import { HomeComponent } from './home/home.component';
import { NewSongComponent } from './songs/new-song/new-song.component';
import { EditSongbookComponent } from './songbooks/edit-songbook/edit-songbook.component';
import { EditLyricsComponent } from './lyrics/edit-lyrics/edit-lyrics.component';
import { AllSongbooksComponent } from './songbooks/all-songbooks/all-songbooks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {
        path: '', // Parent route for the group
        canActivate: [loggedInGuard], // Apply guard if necessary
        children: [
          { path: '', component: HomeComponent },
          { path: 'home', component: HomeComponent },
          { path: 'home/:songbookId', component: HomeComponent },
          { path: 'edit-songbook/:songbookId', component: EditSongbookComponent },
          { path: 'edit-lyrics/:songId', component: EditLyricsComponent },
          { path: 'new-song', component: NewSongComponent },
          { path: 'all-songbooks', component: AllSongbooksComponent },
        ]
    },
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent},
];
