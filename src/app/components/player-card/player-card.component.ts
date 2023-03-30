import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from './../../services/player.service';
import { IMusic } from './../../interfaces/IMusic';
import { newMusic } from 'src/app/common/factories';
import {
  faPlay,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  music: IMusic = newMusic();

  subs: Subscription[] = [];

  // Icones do player
  prevIcon = faStepBackward;
  nextIcon = faStepForward;
  playIcon = faPlay;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getMusicPlaying();
  }

  getMusicPlaying() {
    const sub = this.playerService.currentMusic.subscribe((music) => {
      this.music = music;
    });

    this.subs.push(sub);
  }

  //Método para voltar a música anterior
  backMusic() {
    this.playerService.backMusic();
  }

  //Método para avançar para a próxima música
  nextMusic() {
    this.playerService.nextMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
