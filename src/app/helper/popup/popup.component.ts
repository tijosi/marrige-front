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
  @Input() height: string = '';
  @Input() width: string = '';
  @Input() scroll!: boolean;
  @Input() textBtnClose: string = 'Fechar';

  @Output() close = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<boolean>();

  scrollValue: string = 'scroll';
  widthReal: any = 'calc(100% - 20px)';
  heightReal: any = 'calc(100% - 20px)';

  ngOnInit(): void {
    this.converteDimensoes();
    if(this.scroll) this.scrollValue = 'scroll'
  }

  converteDimensoes() {

    if ( this.width.search('calc') == 0 && (this.width.search('%') > 0 || this.width.search('vw') > 0) ) {

      const porcentagem = Number(this.width.replace(/[^0-9]/g, ''))/100;
      const domElement: HTMLElement = document.documentElement.querySelector('.html-container')!;

      const numberwidth = porcentagem*domElement.clientWidth;
      this.widthReal = numberwidth + 'px';

    } else if ( this.width.search('px') > 0 ) this.widthReal = this.width;

    if ( this.height.search('calc') == 0 && (this.height.search('%') > 0 || this.height.search('vw') > 0) ) {

      const porcentagem = Number(this.height.replace(/[^0-9]/g, ''))/100;
      const domElement: HTMLElement = document.documentElement.querySelector('.html-container')!;

      const numberHeight = (porcentagem*domElement.clientHeight - 30 - 50);
      this.heightReal = numberHeight + 'px';

    } else if (this.height.search('px') > 0) this.heightReal = this.height;

  }

  fechar() {
    this.onClose.emit();
    this.close.emit();
  }
}
