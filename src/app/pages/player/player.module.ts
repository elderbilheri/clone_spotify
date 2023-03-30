import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PlayerRoutes } from './player.routes';
import { PlayerComponent } from './player.component';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { ButtonMenuComponent } from 'src/app/components/button-menu/button-menu.component';
import { UserFooterComponent } from 'src/app/components/user-footer/user-footer.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { SearchesComponent } from 'src/app/components/searches/searches.component';
import { FormsModule } from '@angular/forms';
import { ListTopArtistsComponent } from 'src/app/components/list-top-artists/list-top-artists.component';
import { ImgNameArtistComponent } from 'src/app/components/img-name-artist/img-name-artist.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { MusicsComponent } from '../musics/musics.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    ButtonMenuComponent,
    UserFooterComponent,
    HomeComponent,
    TopArtistComponent,
    RightPanelComponent,
    SearchesComponent,
    ListTopArtistsComponent,
    ImgNameArtistComponent,
    PlayerCardComponent,
    MusicsComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRoutes),
  ],
})
export class PlayerModule {}
