import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PlayerService } from './../../services/player.service';
import { SpotifyService } from './../../services/spotify.service';
import { Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IMusic } from 'src/app/interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.responsive.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();

  subs: Subscription[] = [];

  // Icone para dar Play na música
  playIcon = faPlay;

  // Responsive
  isMediumScreen = false;
  isSmallScreen = false;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  // Chama o método para buscar as músicas curtidas/salvas
  async getMusics() {
    this.musics = await this.spotifyService.getMusicsSaved();
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

  // Se inscreve para validar toda vez que a música atual for atualizada
  getCurrentMusic() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  // Método para deixar a tabela responsiva
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMediumScreen = event.target.innerWidth <= 1250;
    this.isSmallScreen = event.target.innerWidth <= 1150;
  }

  isScreenMedium() {
    return this.isMediumScreen;
  }

  isScreenSmall() {
    return this.isSmallScreen;
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
