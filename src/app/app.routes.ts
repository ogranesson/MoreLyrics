import { Routes } from '@angular/router';

import { loggedInGuard } from './guards/logged-in.guard';
import { deactivateGuard } from './guards/deactivate.guard';
import { adminGuard } from './guards/admin.guard';

import { HomeComponent } from './home/home.component';
import { NewSongComponent } from './songs/new-song/new-song.component';
import { EditSongbookComponent } from './songbooks/edit-songbook/edit-songbook.component';
import { EditSongComponent } from './songs/edit-song/edit-song.component';
import { AllSongbooksComponent } from './songbooks/all-songbooks/all-songbooks.component';
import { SongbooksComponent } from './songbooks/songbooks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    { path: 'home', component: HomeComponent, canActivate: [loggedInGuard] },
    { path: 'songbooks', component: SongbooksComponent, canActivate: [loggedInGuard], children: [
        { path: 'all', component: AllSongbooksComponent },
        { path: 'edit/:songbookId', component: EditSongbookComponent, canDeactivate: [deactivateGuard] }
    ]},
    { path: 'edit-lyrics/:songId', component: EditSongComponent, canActivate: [loggedInGuard], canDeactivate: [deactivateGuard] },
    { path: 'new-song', component: NewSongComponent, canActivate: [loggedInGuard], canDeactivate: [deactivateGuard] },
    { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard], canDeactivate: [deactivateGuard] },
    
    { path: '**', component: PageNotFoundComponent },
];
