import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './../../services/spotify.service';
import { IArtists } from './../../interfaces/IArtists';
import { newArtist } from 'src/app/common/factories';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent implements OnInit {
  topArtist: IArtists = newArtist();

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getArtist();
  }

  async getArtist() {
    const artists = await this.spotifyService.getTopArtist(1);

    if (!!artists) this.topArtist = artists.pop();
  }
}
