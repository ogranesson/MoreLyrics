import { Routes } from '@angular/router';

import { loggedInGuard, loggedInLoadGuard } from './guards/logged-in.guard';
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
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    { path: 'home', component: HomeComponent, canActivate: [loggedInGuard] },

    { path: 'songbooks', canMatch: [loggedInLoadGuard], // lazy loading
        loadChildren: () => import('./songbooks/songbooks.routes').then(m=>m.songbookRoutes)
    },

    { path: 'edit-lyrics/:songId', component: EditSongComponent, canActivate: [loggedInGuard], canDeactivate: [deactivateGuard] },
    { path: 'new-song', component: NewSongComponent, canActivate: [loggedInGuard], canDeactivate: [deactivateGuard] },
    { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard] },
    
    { path: '**', component: PageNotFoundComponent },
];
