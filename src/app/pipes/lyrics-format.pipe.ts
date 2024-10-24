import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lyricsFormat',
  standalone: true
})
export class LyricsFormatPipe implements PipeTransform {
  constructor() {}

  transform(lyrics: string): string {
    return lyrics.replace(/\\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
                  .replace(/\\n/g, '<br>')
                  .replace(/\b([A-G](b|#|bb)?)(maj|min|m|M|\+|-|dim|aug)?[0-9]*(sus[24]?)?(\/[A-G][b|bb]?)?\b(#)?/gm, '<span class="text-green-900 bg-green-200 font-semibold p-0.5">$&</span>');
  }
}