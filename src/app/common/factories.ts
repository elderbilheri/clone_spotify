import { IArtists } from './../interfaces/IArtists';
import { IMusic } from './../interfaces/IMusic';
import { IPlaylist } from './../interfaces/IPlaylist';

export function newArtist(): IArtists {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}

export function newMusic(): IMusic {
  return {
    id: '',
    title: '',
    artists: [],
    album: {
      id: '',
      name: '',
      imageUrl: '',
    },
    time: '',
  };
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: [],
  };
}
