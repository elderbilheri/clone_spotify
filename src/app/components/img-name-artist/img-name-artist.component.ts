import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img-name-artist',
  templateUrl: './img-name-artist.component.html',
  styleUrls: ['./img-name-artist.component.scss'],
})
export class ImgNameArtistComponent {
  @Input()
  imgSrc = '';

  @Output()
  click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
