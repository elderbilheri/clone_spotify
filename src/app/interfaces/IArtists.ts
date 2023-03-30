import { IMusic } from 'src/app/interfaces/IMusic';

export interface IArtists {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusic[];
}
