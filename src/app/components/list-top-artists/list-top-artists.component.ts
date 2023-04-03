import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './../../services/spotify.service';
import { IArtists } from './../../interfaces/IArtists';

@Component({
  selector: 'app-list-top-artists',
  templateUrl: './list-top-artists.component.html',
  styleUrls: ['./list-top-artists.component.scss'],
})
export class ListTopArtistsComponent implements OnInit {
  artists: IArtists[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.spotifyService.getTopArtist(7);
  }
}
