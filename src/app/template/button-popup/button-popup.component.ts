import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-popup',
  templateUrl: './button-popup.component.html',
  styleUrls: ['./button-popup.component.css']
})
export class ButtonPopupComponent {

  @Input() text?: string;
  @Input() icon?: string;
  @Input() disabled = false;
  @Input() visible = true;
  @Input() type: string = 'none';
  @Input() width?: string = 'auto';
  @Output() onClick = new EventEmitter<boolean>();

}
