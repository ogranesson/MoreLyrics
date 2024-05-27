import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleshortener',
  standalone: true
})
export class TitleshortenerPipe implements PipeTransform {

  transform(title: string): string | null {
    const max = 20;
    if (!title) {
      return null;
    }
    else if (title.length < max) {
      return title;
    }
    else
    {
      return title.substring(0, max) + '...';
    }
  }
}
