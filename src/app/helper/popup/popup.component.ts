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
  @Input() height: string = 'auto';
  @Input() width: string = 'calc(100% - 20px)';
  @Input() scroll!: boolean;
  @Input() textBtnClose: string = 'Fechar';

  @Output() close = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<boolean>();

  scrollValue: string = 'scroll';

  ngOnInit(): void {
    this.converteDimensoes();
    if(this.scroll) this.scrollValue = 'scroll'
  }

  converteDimensoes() {

    const elPopup: HTMLElement    = document.querySelector('.popup')!;
    const elPopupBody: HTMLElement    = document.querySelector('.popup-body')!;
    let widthReal = this.width;
    let heightReal = null;

    if ( this.width != 'calc(100% - 20px)' && (this.width.search('%') > 0 || this.width.search('vw') > 0) ) {

      const porcentagem = Number(this.width.replace(/[^0-9]/g, ''))/100;
      const domElement: HTMLElement = document.documentElement.querySelector('.html-container')!;

      const numberwidth = porcentagem*domElement.clientWidth;
      widthReal = numberwidth > window.innerWidth - 20 ? window.innerWidth - 20 + 'px' : numberwidth + 'px';

    } else if ( this.width != 'calc(100% - 20px)' && (this.width.search('px') > 0) ) widthReal = this.width;

    if ( this.height.search('%') > 0 || this.height.search('vw') > 0 ) {

      const porcentagem = Number(this.height.replace(/[^0-9]/g, ''))/100;
      const domElement: HTMLElement = document.documentElement.querySelector('.html-container')!;

      const numberHeight = (porcentagem*domElement.clientHeight - 30 - 50);
      heightReal = numberHeight > window.innerHeight - 40 ? window.innerHeight - 40 - 30 - 50 + 'px' : numberHeight + 'px'; + 'px';

    } else if (this.height.search('px') > 0) heightReal = this.height;

    elPopupBody.style.height = heightReal != null ?
      heightReal :
      elPopupBody.clientHeight > window.innerHeight - 40 ?
        window.innerHeight - 40 - 30 - 50 + 'px' :
        (elPopupBody.clientHeight - 30 - 50) + 'px';
    elPopup.style.width = widthReal;

  }

  fechar() {
    this.onClose.emit();
    this.close.emit();
  }
}
