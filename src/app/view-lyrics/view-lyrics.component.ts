import { Component, Input, Output } from '@angular/core';
import { Song } from '../models/song.model';
import { CommonModule } from '@angular/common';
import { YoutubeLinkToEmbedPipe } from '../pipes/youtube-link-to-embed.pipe';
import { SafePipe } from '../pipes/safe.pipe';
import { LyricsFormatPipe } from '../pipes/lyrics-format.pipe';

@Component({
  selector: 'app-view-lyrics',
  standalone: true,
  imports: [CommonModule, YoutubeLinkToEmbedPipe, SafePipe, LyricsFormatPipe],
  templateUrl: './view-lyrics.component.html',
  styleUrl: './view-lyrics.component.css'
})
export class ViewLyricsComponent {
  @Input('songdataToChild') songdata: Song | null = null;
}
