import { HomeComponent } from './../home/home.component';
import { Routes } from '@angular/router';

import { PlayerComponent } from './player.component';
import { MusicsComponent } from '../musics/musics.component';

export const PlayerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'musics/:type/:id',
        component: MusicsComponent,
      },
    ],
  },
];
