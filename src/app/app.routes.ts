import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewSongComponent } from './new-song/new-song.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'new-song', component: NewSongComponent},
];
