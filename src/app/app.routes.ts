import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewSongComponent } from './new-song/new-song.component';
import { AllSongbooksComponent } from './all-songbooks/all-songbooks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'home/:songbookId', component: HomeComponent},
    {path: 'new-song', component: NewSongComponent},
    {path: 'all-songbooks', component: AllSongbooksComponent},
    {path: '**', component: PageNotFoundComponent},
];
