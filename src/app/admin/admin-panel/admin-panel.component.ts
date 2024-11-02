import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  songbookCount: number | null = null;
  songCount: number | null = null;
  error: string | null = null;

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.fetchCounts();
  }

  fetchCounts() {
    this.authservice.getSongbookCount().subscribe({
      next: count => (this.songbookCount = count),
      error: err => (this.error = 'Failed to fetch songbook count: ' + err)
    });

    this.authservice.getSongCount().subscribe({
      next: count => (this.songCount = count),
      error: err => (this.error = 'Failed to fetch song count: ' + err)
    });
  }
}
