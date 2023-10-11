import { Component, ContentChildren, Input, OnInit, QueryList, EventEmitter, Output } from '@angular/core';
import { ButtonPopupComponent } from '../button-popup/button-popup.component';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @ContentChildren(ButtonPopupComponent)
  buttons!: QueryList<ButtonPopupComponent>;

  @Input() title!: string;
  @Input() height!: string;
  @Input() width!: string;
  @Input() scroll!: boolean;
  @Input() textBtnClose: string = 'Fechar';

  @Output() close = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<boolean>();

  widthReal!: string;
  heightReal!: string;
  scrollValue: string = 'hidden';

  ngOnInit(): void {
    this.converteDimensoes();
    if(this.scroll) this.scrollValue = 'scroll'
  }

  converteDimensoes() {

    if ( this.width && (this.width.search('%') > 0 || this.width.search('vw') > 0) ) {
      let porcentagem = Number(this.width.replace(/[^0-9]/g, ''))/100;

      let domElement: HTMLElement = document.documentElement.querySelector('.html-container')!;
      this.widthReal = porcentagem*domElement.clientWidth + 'px';

    } else {
      this.widthReal = this.width
    }

    if ( this.height && (this.height.search('%') > 0 || this.height.search('vw') > 0) && window.screen.height >= 500) {
      let porcentagem = Number(this.height.replace(/[^0-9]/g, ''))/100;

      let domElement: HTMLElement = document.documentElement.querySelector('.html-container')!;
      this.heightReal = porcentagem*domElement.clientHeight + 'px';

    } else {
      this.heightReal = this.height;
    }
  }

  fechar() {
    this.onClose.emit();
    this.close.emit();
  }
}
