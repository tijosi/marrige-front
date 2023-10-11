import { Component, OnInit } from '@angular/core';
import { Notify } from 'src/app/helper/notify';
import { PresentesService } from 'src/app/service/presentes.service';

@Component({
  selector: 'app-presentes',
  templateUrl: './presentes.component.html',
  styleUrls: ['./presentes.component.css']
})
export class PresentesComponent implements OnInit{

  dsPresentes!: any;

  showPopup: boolean = false;
  showPopupConfirmar: boolean = false;
  gifts: boolean = true;

  dsLevel = [
    {id: 'baixo', name: 'PRATA'},
    {id: 'medio', name: 'ROSEGOLD'},
    {id: 'alto',  name: 'GOLD'}
  ]

  constructor(
    private rest: PresentesService
  ){}

  async ngOnInit() {
    this.search();
  }

  async search() {
    this.dsPresentes = await this.rest.getPresentes();
  }

  getInstallmentInfo(item: any) {
    if(item.qts_parcelas) return`Ou ${item.qts_parcelas}x de R$ ${item.valor_parcela}`

    return "Sem parcelamento";

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

  item: any;
  openPopup(item: any) {
    this.item = item;
    console.log(this.item);
    this.showPopup = true;
  }

  openPopupConfirmacao() {
    this.showPopupConfirmar = true;
  }

  async submitConfirmar() {

      await this.rest.confirmPresente(this.item);
      this.showPopupConfirmar = false;
      this.showPopup = false;
      this.search();

  }
}
