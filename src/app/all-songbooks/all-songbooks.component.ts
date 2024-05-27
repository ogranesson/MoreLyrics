import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Songbook } from '../models/songbook.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-songbooks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-songbooks.component.html',
  styleUrl: './all-songbooks.component.css',
  providers: [DataService]
})
export class AllSongbooksComponent {
  constructor(private dataservice: DataService, private router: Router){}
  songbooks: Songbook[] = [];
  selectedSongbookId: string = '';

  ngOnInit() {
    this.dataservice.getSongbooks().subscribe(songbooks => {
      this.songbooks = songbooks;
    });
  }

  selectSongbook(id: string) {
    this.router.navigate(['/home', id]);
  }
}
