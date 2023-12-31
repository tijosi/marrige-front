import { GuardService } from './../../service/guard.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDataSoruceGift } from 'src/app/interface/IGift.interface';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent {

  @Input() dsArea: any[] = [];
  @Input() dataSource: IDataSoruceGift[] = [];

  @Output() btnClick = new EventEmitter<any>();

  isAdmin = this.guard.isAdmin;

  constructor(
    private guard: GuardService
  ){}

  ngOnInit() {}

  ngAfterContentInit() {}

  ngOnChanges() {}

  borderGift(area: any): string {

    const selection = this.dsArea.filter(el => el.id == area);
    return `box-shadow: 0px 0px 5px ${selection[0].color}; border: 1px solid ${selection[0].color} ;`

  }

  borderGiftTrash(area: any): string {

    const selection = this.dsArea.filter(el => el.id == area);
    return `
      box-shadow: 0px 0px 5px ${selection[0].color};
      border: 1px solid ${selection[0].color};
      border-radius: 3px 3px 0 0;
    `

  }

  bannerStyle(area: any) {

    const selection = this.dsArea.filter(el => el.id == area);
    return `background: ${selection[0].color};`

  }

  getSizeAreaElement(elemento: string, type: string): any {
    if(type == 'width') {
      const style: any = window.getComputedStyle(document.querySelector(elemento)!);
      return `calc(${style.width} - ${style.paddingLeft} - ${style.paddingRight} + 10px)`;
    } else if(type == 'height') {
      const style: any = window.getComputedStyle(document.querySelector(elemento)!);
      return `calc(${style.height} - ${style.paddingTop} - ${style.paddingBottom})`;
    }
  }

  lookup(el: any) {
    var result = null;
    for (let i = 0; i < this.dsArea.length; i++) {
      const element = this.dsArea[i].id;
      if (el == element) result = this.dsArea[i].descricao
    }

    return result;
  }

}
