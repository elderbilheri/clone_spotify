import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';

import { SpotifyConfiguration } from './../../environments/environment';
import {
  SpotifyArtistToArtist,
  SpotifyPlaylistFromPlaylist,
  SpotifyPlaylistToPlaylist,
  SpotifyTrackToMusic,
  SpotifyUserToUser,
} from '../common/spotifyHelper';
import { IUser } from '../interfaces/IUser';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtists } from './../interfaces/IArtists';
import { IMusic } from './../interfaces/IMusic';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUser;

  constructor(private Router: Router) {
    this.spotifyApi = new Spotify();
  }

  //Realiza a validação de login com a api
  async initializeUser() {
    if (!!this.usuario) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.setAccessToken(token);
      await this.getSpotifyUser();
      return !!this.usuario;
    } catch (ex) {
      return false;
    }
  }

  //Função para pegar os dados do usuário a partir da interface
  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserToUser(userInfo);
  }

  //Função para buscar e montar a url de acesso do usuário
  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responsetype = `response_type=token&show_dialog=true`;

    return authEndpoint + clientId + redirectUrl + scopes + responsetype;
  }

  //Realiza a busca e tratamento do token enviado pela api do Spotify
  getTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  //Salva o token no localstorage
  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  //Busca as playlists do usuário e limita a quantidade por página
  async getUserPlaylist(offset = 0, limit = 20): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {
      offset,
      limit,
    });
    return playlists.items.map(SpotifyPlaylistToPlaylist);
  }

  //Função para buscar uma playlist específica
  async getMusicsPlaylist(
    playlistId: string,
    offset: number = 0,
    limit: number = 50
  ) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify) return null;

    const playlist = SpotifyPlaylistFromPlaylist(playlistSpotify);

    const musicsSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });

    playlist.musics = musicsSpotify.items.map((music) =>
      SpotifyTrackToMusic(music.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  //Faz a busca dos artistas mais ouvidos
  async getTopArtist(limit = 10): Promise<IArtists[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistToArtist);
  }

  // Método para buscar as músicas curtidas/salvas
  async getMusicsSaved(offset = 0, limit = 50): Promise<IMusic[]> {
    const musicsSaveds = await this.spotifyApi.getMySavedTracks({
      offset,
      limit,
    });
    return musicsSaveds.items.map((x) => SpotifyTrackToMusic(x.track));
  }

  // Método para colocar uma música na playlist e depois dar um next para que ela toque
  async playMusic(uri: string) {
    await this.spotifyApi.queue(uri);
    await this.spotifyApi.skipToNext();
  }

  //  Obtém a música atual
  async getCurrentMusic(): Promise<IMusic> {
    const musicCurrent = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackToMusic(musicCurrent.item);
  }

  //Método para voltar a música anterior
  async backMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  //Método para avançar para a próxima música
  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  //Realiza o logout
  logout() {
    localStorage.clear();
    this.Router.navigate(['/login']);
  }
}
