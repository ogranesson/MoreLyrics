// songbook-filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Songbook } from '../models/songbook.model';

@Pipe({
  name: 'songbookFilter',
  standalone: true,
})
export class SongbookFilterPipe implements PipeTransform {
  transform(songbooks: Songbook[], searchTerm: string): Songbook[] {
    if (!songbooks) {
      return [];
    }
    if (!searchTerm) {
      return songbooks;
    }
    return songbooks.filter(songbook => // like saying for songbook in songbooks, can be applied directly to ngFor
      songbook.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
