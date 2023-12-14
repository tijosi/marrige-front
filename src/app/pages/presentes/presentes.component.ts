import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Notify } from 'src/app/helper/notify';
import { PresentesService } from 'src/app/service/presentes.service';

@Component({
  selector: 'app-presentes',
  templateUrl: './presentes.component.html',
  styleUrls: ['./presentes.component.css']
})
export class PresentesComponent implements OnInit{

  @ViewChild('vlr_minimo') vlr_minimo!: ElementRef
  @ViewChild('vlr_maximo') vlr_maximo!: ElementRef

  optionsCurrencyBRLMask = {
    alias: 'numeric',
    radixPoint: ',',
    groupSeparator: '.',
    autoGroup: true,
    prefix: 'R$ ',
    digits: 2,
    digitsOptional: false,
    clearMaskOnLostFocus: false,
  };

  dsPresentes: any[] = [];

  imgUrl!: any;
  formAdicionar: any = {
    nomePresente: null,
    vlr_minimo: null,
    vlr_maximo: null,
    link: null,
    file: null
  };

  gifts: boolean = true;
  showPopup: boolean = false;
  showLoadPanel: boolean = true;
  showPopupConfirmar: boolean = false;
  showPopupAdicionar: boolean = false;


  constructor(
    private rest: PresentesService
  ) {}

  ngOnInit() {
    this.search();
  }

  getMask() {
    Inputmask(this.optionsCurrencyBRLMask).mask(this.vlr_minimo.nativeElement);
    Inputmask(this.optionsCurrencyBRLMask).mask(this.vlr_maximo.nativeElement);
  }

  search() {
    this.showLoadPanel = true;
    this.rest.presentes().subscribe({

      next: data => {

        this.dsPresentes = data.sort(function(a: any, b: any){
          return b.valor - a.valor;
        });

        for (const el of this.dsPresentes) {
          el.valor = el.valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
        }
      },

      error: e =>  Notify.error(e.error.message),

      complete: () => {
        this.showLoadPanel = false;
      }

    });
  }

  item: any;
  openPopup(item: any) {
    this.item = item;
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

  openPopupAdicionar() {
    this.showPopupAdicionar = true;
    setTimeout(()=>this.getMask(),100)
  }

  onFileSelected(event: any) {
    this.formAdicionar.file = event.target.files[0];

    if (this.formAdicionar.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = e.target?.result;
      };
      reader.readAsDataURL(this.formAdicionar.file);
    }

  }

  submitAdicionar() {
    console.log(this.formAdicionar);
  }
}
