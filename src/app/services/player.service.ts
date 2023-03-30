import { SpotifyService } from './spotify.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMusic } from './../interfaces/IMusic';
import { newMusic } from '../common/factories';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentMusic = new BehaviorSubject<IMusic>(newMusic());

  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentMusic();
  }

  // Chama o método que busca a música atual e seta a música atual
  async getCurrentMusic() {
    clearTimeout(this.timerId);

    // Obter a música
    const music = await this.spotifyService.getCurrentMusic();
    this.setCurrentMusic(music);

    // Realizar o loop
    this.timerId = setInterval(async () => {
      await this.getCurrentMusic();
    }, 3000);
  }

  // Publica o valor da música atual para os as funçòes que se inscreveram escutarem o novo valor
  setCurrentMusic(music: IMusic) {
    this.currentMusic.next(music);
  }

  //Método para voltar a música anterior
  backMusic() {
    this.spotifyService.backMusic();
  }

  //Método para avançar para a próxima música
  nextMusic() {
    this.spotifyService.nextMusic();
  }
}
