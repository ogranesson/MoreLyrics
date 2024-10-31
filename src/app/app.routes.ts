import { Routes } from '@angular/router';

import { loggedInGuard } from './guards/logged-in.guard';
import { deactivateGuard } from './guards/deactivate.guard';

import { HomeComponent } from './home/home.component';
import { NewSongComponent } from './songs/new-song/new-song.component';
import { EditSongbookComponent } from './songbooks/edit-songbook/edit-songbook.component';
import { EditLyricsComponent } from './lyrics/edit-lyrics/edit-lyrics.component';
import { AllSongbooksComponent } from './songbooks/all-songbooks/all-songbooks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    { path: 'home', component: HomeComponent, canActivate: [loggedInGuard] },
    { path: 'songbooks', component: AllSongbooksComponent, canActivate: [loggedInGuard], children: [
        { path: 'edit/:songbookId', component: EditSongbookComponent, canDeactivate: [deactivateGuard] }
    ]},
    { path: 'edit-lyrics/:songId', component: EditLyricsComponent, canDeactivate: [deactivateGuard] },
    { path: 'new-song', component: NewSongComponent, canDeactivate: [deactivateGuard] },
    
    { path: '**', component: PageNotFoundComponent },
];
