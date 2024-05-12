import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Notify } from 'src/app/template/notify';
import { PresentesService } from 'src/app/service/presentes.service';
import { TransformHelper } from 'src/app/helper/TransformHelper';
import { GuardService } from 'src/app/service/guard.service';
import { DialogComponent } from 'src/app/template/dialog/dialog.component';

@Component({
  selector: 'app-presentes',
  templateUrl: './presentes.component.html',
  styleUrls: ['./presentes.component.css']
})
export class PresentesComponent implements OnInit{

  @ViewChild('vlr_minimo') vlr_minimo!: ElementRef
  @ViewChild('vlr_maximo') vlr_maximo!: ElementRef

  dsPresentes: any[] = [];
  dsArea: any [] = [];

  isAdmin = this.guard.isAdmin;

  imgUrl!: any;
  formAdicionar: any = {
    vlr_minimo: 0,
    vlr_maximo: 0
  };

  showPopup: boolean = false;
  showLoadPanel: boolean = true;
  showPopupConfirmar: boolean = false;
  showPopupAdicionar: boolean = false;


  constructor(
    private rest: PresentesService,
    private guard: GuardService
  ) {}

  ngOnInit() {

    this.rest.presentesArea().subscribe({
      next: data => this.dsArea = data
    });

    this.search();

  }

  getMask() {
    Inputmask(this.rest.optionsCurrencyBRLMask).mask(this.vlr_minimo.nativeElement);
    Inputmask(this.rest.optionsCurrencyBRLMask).mask(this.vlr_maximo.nativeElement);
  }

  loadingPosition: any;
  search(filter?: any) {
    this.dsPresentes = [];
    this.loadingPosition = '#gifts';
    setTimeout(() => this.showLoadPanel = true, 10);
    this.rest.presentes().subscribe({
      next: data => {
        if (filter && filter != 'TODOS') {
          data = data.filter((el: any) => {
            return el.level == filter;
          });
        }

        this.dsPresentes = data.sort(function(a: any, b: any){
          return b.valor - a.valor;
        });

        for (const el of this.dsPresentes) {
          el.valor = el.valor.toLocaleString('pt-br', {minimumFractionDigits: 2});
        }
        this.showLoadPanel = false;
      },
      error: e =>  {
        Notify.error(e.error.message);
        this.showLoadPanel = false;
      }
    });
  }

  valueChange(value: any) {
    this.search(value);
  }

  item: any;
  openPopup(item: any) {
    this.item = item;
    this.showPopup = true;
  }

  tipoPresente!: 'Valor' | 'Presente';
  openPopupConfirmacao(string: 'Valor' | 'Presente') {
    this.tipoPresente = string;
    this.showPopupConfirmar = true;
  }

  confirmarPresente() {
    this.loadingPosition = '';
    this.showLoadPanel = true;
    const form = {
      presenteId: this.item.id,
      tipo: this.tipoPresente
    };
    this.rest.confirmarPresente(form).subscribe({
      next: (data) => {
        this.showPopupConfirmar = false;
        this.showPopup = false;
        this.showLoadPanel = false;
        this.search();
        Notify.success('MUITO OBRIGADOOOO💖');
        if (data.link) {
          window.open(data.link, '_blank');
        }
      },
      error: (e) => {
        this.showLoadPanel = false;
        Notify.error(e.error.message);
      }
    })
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

  excluirPresente(item: any) {

    DialogComponent.confirm('Deseja Exlcuír o presente <b><i>' + item.nome + '</i></b> ?', 'Excluír Presente').subscribe({
      next: response => {
        if (!response) return;

        this.loadingPosition = '';
        this.showLoadPanel = true;
        this.rest.excluirPresente(item.id).subscribe({
          next: () => {
            this.showLoadPanel = false;
            this.search();
            Notify.success('Presente ' + item.nome + ' excluído com Sucesso!');
          },
          error: (e) => {
            this.showLoadPanel = false;
            Notify.error(e.error.message);
          }
        })
      }

    });

  }

  submitAdicionar() {

    this.formAdicionar.vlr_minimo = TransformHelper.currencyBrlToFloat(this.vlr_minimo.nativeElement.inputmask.unmaskedvalue());
    this.formAdicionar.vlr_maximo = TransformHelper.currencyBrlToFloat(this.vlr_maximo.nativeElement.inputmask.unmaskedvalue());

    this.loadingPosition = '.popup';
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
        Notify.error(e.error.message)
        this.showLoadPanel = false;
      }
    });
  }

}
