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

    async searchPresente() {
        this.showLoadPanel = true;
        this.restPresente.presentes(this.presenteId).subscribe({
            next: data => {
                if (!data) this.router.navigate(['/presentes']);
                this.presente = data;
                this.showLoadPanel = false;
                if (this.presente.flg_disponivel == 0) {
                    this.showPopupSelecionado = true;
                } else {
                    this.active = true;
                }
            },
            error: err => {
                this.active = false;
                this.router.navigate(['/presentes']);
                this.showLoadPanel = false;
            }
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

    confirmarPresente(tipo: string = 'VALOR' || 'PRODUTO') {
        this.presente.tipoPresente = tipo;
        this.showPopupConfirmar = true;
    }

    submit() {
        this.showLoadPanel = true;
        const form = {
            presenteId: this.presente.id,
            tipo: this.presente.tipoPresente
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
