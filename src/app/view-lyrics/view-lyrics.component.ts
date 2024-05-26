import { Component, Input, Output } from '@angular/core';
import { Song } from '../models/songbook.model';
import { CommonModule } from '@angular/common';
import { YoutubeLinkToEmbedPipe } from '../pipes/youtube-link-to-embed.pipe';
import { SafePipe } from '../pipes/safe.pipe';

@Component({
  selector: 'app-view-lyrics',
  standalone: true,
  imports: [CommonModule, YoutubeLinkToEmbedPipe, SafePipe],
  templateUrl: './view-lyrics.component.html',
  styleUrl: './view-lyrics.component.css'
})
export class ViewLyricsComponent {
  @Input('songdataToChild') songdata!: Song;
}
