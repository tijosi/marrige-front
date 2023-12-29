import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDataSoruceGift } from 'src/app/interface/IGift.interface';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent {

  @Input() dataSource: IDataSoruceGift[] = [];

  @Output() btnClick = new EventEmitter<any>();

  dsLevel = [
    {id: 'BAIXO', name: 'PRATA'},
    {id: 'MEDIO', name: 'ROSEGOLD'},
    {id: 'ALTO',  name: 'GOLD'}
  ];

  constructor(){}

  ngOnInit() {

  }

  ngAfterContentInit() {

  }

  ngOnChanges() {

  }

  borderGift(level: any): string {
    if (level == 'BAIXO') return "box-shadow: 0px 0px 5px #c8c8c8; border: 1px solid #c8c8c8";
    if (level == 'MEDIO') return "box-shadow: 0px 0px 5px #e7b2a4; border: 1px solid #e7b2a4";
    if (level == 'ALTO')  return "box-shadow: 0px 0px 5px #ffce7f; border: 1px solid #ffce7f";
    return ""
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
    for (let i = 0; i < this.dsLevel.length; i++) {
      const element = this.dsLevel[i].id;
      if (el == element) result = this.dsLevel[i].name
    }

    return result;
  }

}
