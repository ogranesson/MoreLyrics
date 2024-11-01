import { Component } from '@angular/core';
import { Song } from '../../models/song.model';
import { CommonModule } from '@angular/common';
import { YoutubeLinkToEmbedPipe } from '../../pipes/youtube-link-to-embed.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { LyricsFormatPipe } from '../../pipes/lyrics-format.pipe';
import { FirestoreService } from '../../firestore.service';

@Component({
  selector: 'app-view-lyrics',
  standalone: true,
  imports: [CommonModule, YoutubeLinkToEmbedPipe, LyricsFormatPipe],
  templateUrl: './view-lyrics.component.html',
  styleUrl: './view-lyrics.component.css'
})
export class ViewLyricsComponent {
  songdata!: Song | null;

  constructor(private firestoreservice: FirestoreService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.firestoreservice.selectedSong.subscribe({
      next:(song: Song) => {
        this.songdata = song;
      }
    });
  }
}
