import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresentesService } from 'src/app/service/presentes.service';
import { Notify } from 'src/app/template/notify';

@Component({
    selector: 'app-presente-detail',
    templateUrl: './presente-detail.component.html',
    styleUrls: ['./presente-detail.component.css']
})
export class PresenteDetailComponent {

    presenteId!: string;
    presente: any;
    active: boolean = false;
    showPopupConfirmar: boolean = false;
    showPopupSelecionado: boolean = false;
    showLoadPanel: boolean = false;
    valorPresentear: any;

    form: any = {
        quantidade: 1
    }

    displayedColumns = ['nome', 'descricao'];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private restPresente: PresentesService,
    ) {
        this.route.paramMap.subscribe(params => {
            this.presenteId = params.get('id')!;
            this.searchPresente();
        })
    }

    get getCurrencyBrlOptions(): object {
        return {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: "currency",
            currency: "BRL"
        }
    }

    updateValorPresentear(event: any) {
        this.valorPresentear = (this.presente.vlr_cota * event.target.value).toLocaleString('pt-br', this.getCurrencyBrlOptions);
    }

    async searchPresente() {
        this.showLoadPanel = true;
        this.restPresente.presentes(this.presenteId).subscribe({
            next: data => {
                if (!data) this.router.navigate(['/presentes']);
                this.presente = data;
                this.presente.valor_disponivel = this.presente.valor - this.presente.vlr_processando - this.presente.vlr_presenteado;

                if (this.presente.flg_disponivel == 0)  this.showPopupSelecionado = true;
                else                                    this.active = true;
            },
            error: err => {
                this.active = false;
                this.router.navigate(['/presentes']);
            }
        }).add(() => {
            this.showLoadPanel = false;
        })
    }

    produtoSelecionado() {
        this.active = false;
        this.showLoadPanel = false;
        this.showPopupSelecionado = false;
        this.router.navigate(['/presentes']);
    }

    close() {
        this.active = false;
        this.router.navigate(['/presentes']);
    }

    confirmarPresente(tipo: string = 'VALOR' || 'PRODUTO' || 'COTA') {
        if (tipo == 'COTA') {
            this.form = {
                quantidade: 1
            }
            this.valorPresentear = this.presente.vlr_cota.toLocaleString('pt-br', this.getCurrencyBrlOptions);
        }

        this.presente.tipoPresente = tipo;
        this.showPopupConfirmar = true;
    }

    submit() {
        this.showLoadPanel = true;
        const form = {
            presenteId: this.presente.id,
            tipo: this.presente.tipoPresente,
            qtd_cota: this.form.quantidade
        };
        this.restPresente.confirmarPresente(form).subscribe({
            next: (data) => {
                this.showPopupConfirmar = false;
                this.showLoadPanel = false;
                if (data.link) {
                    window.open(data.link);
                }
                Notify.success('MUITO OBRIGADOOOO💖');
                this.router.navigate(['/presentes']);
            },
            error: (e) => {
                this.showLoadPanel = false;
            }
        })
    }
}
