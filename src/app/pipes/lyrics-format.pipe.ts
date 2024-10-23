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
                  .replace(/\b[A-G][\#b\d]?(m|maj|min|aug|dim|sus(2|4)?|add)?\d*(\/[A-G][\#b]?)?/gm, '<span class="text-green-900 bg-green-200 font-semibold p-0.5">$&</span>');
  }
}