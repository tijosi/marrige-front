import { Component, OnInit } from '@angular/core';
import { PresentesService } from 'src/app/service/presentes.service';

@Component({
  selector: 'app-presentes',
  templateUrl: './presentes.component.html',
  styleUrls: ['./presentes.component.css']
})
export class PresentesComponent implements OnInit{

  dsPresentes!: any;

  constructor(
    private rest: PresentesService
  ){}

  async ngOnInit() {
    try {
      this.dsPresentes = await this.rest.getPresentes();
    } catch (error) {

    }
  }

  getInstallmentInfo(item: any) {
    if(item.qts_parcelas) return`Ou ${item.qts_parcelas}x de R$ ${item.valor_parcela}`

    return "Sem parcelamento";

  }

  getSizeAreaElement(elemento: string, type: string): any {
    if(type == 'width') {
      const style: any = window.getComputedStyle(document.querySelector(elemento)!);
      return `calc(${style.width} - ${style.paddingLeft} - ${style.paddingRight} + 30px)`;
    } else if(type == 'height') {
      const style: any = window.getComputedStyle(document.querySelector(elemento)!);
      return `calc(${style.height} - ${style.paddingTop} - ${style.paddingBottom})`;
    }
  }


}
