import { Routes } from "@angular/router";
import { SongbooksComponent } from "./songbooks.component";
import { loggedInGuard } from "../guards/logged-in.guard";
import { AllSongbooksComponent } from "./all-songbooks/all-songbooks.component";
import { EditSongbookComponent } from "./edit-songbook/edit-songbook.component";
import { deactivateGuard } from "../guards/deactivate.guard";

export const songbookRoutes: Routes = [
    { path: '', component: SongbooksComponent, canActivate:[loggedInGuard], children: [
        { path: 'all', loadComponent: () => import('./all-songbooks/all-songbooks.component').then(m => m.AllSongbooksComponent) },
        { path: 'edit/:songbookId', loadComponent: () => import('./edit-songbook/edit-songbook.component').then(m => m.EditSongbookComponent), canDeactivate:[deactivateGuard] }
    ]}
]