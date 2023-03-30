import { IMusic } from 'src/app/interfaces/IMusic';

export interface IPlaylist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: IMusic[];
}
