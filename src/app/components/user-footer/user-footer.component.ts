import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../interfaces/IUser';
import { SpotifyService } from './../../services/spotify.service';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss'],
})
export class UserFooterComponent implements OnInit {
  logOut = faSignOutAlt;
  usuario: IUser = null;

  constructor(private SpotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.usuario = this.SpotifyService.usuario;
  }

  logout() {
    this.SpotifyService.logout();
  }
}
