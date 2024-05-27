import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lyricsFormat',
  standalone: true
})
export class LyricsFormatPipe implements PipeTransform {

  transform(lyrics: string): string {
    return lyrics.replace(/\n/g, '<br>')
                  .replace(/\b[A-G][#b]?(m|maj|min|aug|dim|sus|add)?\d*(\/[A-G][#b]?)?\b/g, '<span class="text-green-900 bg-green-200 font-semibold p-0.5">$&</span>');
  }

}
