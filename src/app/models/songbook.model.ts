export interface Songbook {
    id: number;
    name: string;
    songs: Song[];
}

export interface Song {
    id: number;
    title: string;
    author: string;
    link: string;
    lyrics: string;
}