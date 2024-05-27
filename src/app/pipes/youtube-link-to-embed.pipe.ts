import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeLinkToEmbed',
  standalone: true
})
export class YoutubeLinkToEmbedPipe implements PipeTransform {

  transform(link: string): string {
    const regExp = /^.*(youtu\.be\/|youtube\.com\/|v\/|u\/\w\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = link.match(regExp);

    if (match && match[2].length == 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return link;
  }
}
