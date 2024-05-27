export class Songbook {
    id: string;
    name: string;
    img: string;
    songIds: number[];
    
    constructor() {
        this.id = "";
        this.name = "New notebook";
        this.img = '../../assets/img/default.png';
        this.songIds = [];
    }
}

