import { PlayerService } from './../../services/player.service';
import { SpotifyService } from './../../services/spotify.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMusic } from './../../interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss'],
})
export class MusicsComponent implements OnInit, OnDestroy {
  bannerImageUrl = '';
  bannerText = '';

  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();

  title: string = '';

  subs: Subscription[] = [];

  //Icones
  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private activedRoute: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  // Método para se inscrever e validar as rotas conforme os parâmetros
  getMusics() {
    const sub = this.activedRoute.paramMap.subscribe(async (params) => {
      const type = params.get('type');
      const id = params.get('id');
      await this.getDataPage(type, id);
    });

    this.subs.push(sub);
  }

  // Método para validar se será uma playlist, artista ou música e pegar o ID
  async getDataPage(type: string, id: string) {
    if (type === 'playlist') await this.getDataPlaylist(id);
    else await this.getDataArtist(id);
  }

  // Pegar os dados das playlists
  async getDataPlaylist(playlistId: string) {
    const playlistMusics = await this.spotifyService.getMusicsPlaylist(
      playlistId
    );
    this.setDataPage(
      playlistMusics.name,
      playlistMusics.imageUrl,
      playlistMusics.musics
    );
    this.title = `Músicas Playlist: ${playlistMusics.name}`;
  }

  // Pegar os dados dos Artistas
  async getDataArtist(artistId: string) {}

  // Setar os dados do banner
  setDataPage(bannerText: string, bannerImage: string, musics: IMusic[]) {
    this.bannerText = bannerText;
    this.bannerImageUrl = bannerImage;
    this.musics = musics;
  }

  // Chama o método para buscar os artistas/cantores
  getArtists(music: IMusic) {
    return music.artists.map((artist) => artist.name).join(', ');
  }

  // Da play na música e seta a música atual
  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentMusic(music);
  }

  // Método parq verificar a música atual
  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
