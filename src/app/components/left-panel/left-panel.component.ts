import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './../../services/spotify.service';
import { IPlaylist } from './../../interfaces/IPlaylist';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: [
    './left-panel.component.scss',
    './left-panel.responsive.component.scss',
  ],
})
export class LeftPanelComponent implements OnInit {
  menuSelected = 'Home';

  playlists: IPlaylist[] = [];

  // Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  constructor(private Router: Router, private SpotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getPlaylists();
  }

  buttonClick(button: string) {
    this.menuSelected = button;
    this.Router.navigate(['player/home']);
  }

  async getPlaylists() {
    this.playlists = await this.SpotifyService.getUserPlaylist();
  }

  goToPlaylist(playlistId: string) {
    this.menuSelected = playlistId;
    this.Router.navigateByUrl(`player/musics/playlist/${playlistId}`);
  }
}
