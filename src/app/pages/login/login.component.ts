import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpotifyService } from './../../services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.checkTokenCallback();
  }

  checkTokenCallback() {
    const token = this.spotifyService.getTokenUrlCallback();
    if (!!token) {
      this.spotifyService.setAccessToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  loginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
  }
}
