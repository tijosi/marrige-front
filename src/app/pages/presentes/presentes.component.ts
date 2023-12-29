import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Notify } from 'src/app/template/notify';
import { PresentesService } from 'src/app/service/presentes.service';
import { TransformHelper } from 'src/app/helper/TransformHelper';

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
    vlr_minimo: 0,
    vlr_maximo: 0
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

  loadingPosition: any;
  search() {
    this.showLoadPanel = true;
    this.loadingPosition = '#gifts';
    this.dsPresentes = [];
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

    if (event.target.files[0]) {

      const file: File = event.target.files[0];
      this.formAdicionar.file = file;

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imgUrl = e.target?.result;
        };
        reader.readAsDataURL(file);
      }

    }

  }

  submitAdicionar() {

    this.formAdicionar.vlr_minimo = TransformHelper.currencyBrlToFloat(this.vlr_minimo.nativeElement.inputmask.unmaskedvalue());
    this.formAdicionar.vlr_maximo = TransformHelper.currencyBrlToFloat(this.vlr_maximo.nativeElement.inputmask.unmaskedvalue());

    this.loadingPosition = '.form-container';
    this.showLoadPanel = true;

    this.rest.savePresente(this.formAdicionar).subscribe({

      next: data => {
        this.showPopupAdicionar = false;
        this.showLoadPanel = false;
        this.imgUrl = null;
        this.formAdicionar = {
          vlr_minimo:0,
          vlr_maximo:0
        };
        this.search();
      },

      error: e => {
        Notify.error(e.message)
        this.showLoadPanel = false;
      }
    });
  }

}
