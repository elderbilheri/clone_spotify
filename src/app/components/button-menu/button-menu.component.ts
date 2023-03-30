import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.scss'],
})
export class ButtonMenuComponent {
  @Input()
  description: string = '';

  @Input()
  selected: boolean = false;

  @Output()
  click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
