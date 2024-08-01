import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Notify } from 'src/app/template/notify';
import { PresentesService } from 'src/app/service/presentes.service';
import { TransformHelper } from 'src/app/helper/TransformHelper';
import { GuardService } from 'src/app/service/guard.service';
import { DialogComponent } from 'src/app/template/dialog/dialog.component';
import { Router } from '@angular/router';
import { StringHelper } from 'src/app/helper/StringHelper';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-presentes',
    templateUrl: './presentes.component.html',
    styleUrls: ['./presentes.component.css']
})
export class PresentesComponent implements OnInit {
    @ViewChild('valor') valor!: ElementRef
    @ViewChild('valorPagamentoManual') valorPagamentoManual!: ElementRef

    dsPresentes: any[] = [];
    dsArea: any[] = [];

    pathImgCarrousel: any[] = [
        '../../../assets/tutorial-presente/area.png',
        '../../../assets/tutorial-presente/prioridade.png',
        '../../../assets/tutorial-presente/cota.png'
    ];

    isAdmin = this.guard.isAdmin;

    imgUrl!: any;
    formAdicionar: any = {
        valor: 0
    };

    formPagamentoManual: any = {};

    tag: any = {
        nome: null,
        descricao: null,
        validate: false
    };
    tags: any[] = [];

    showLoadPanel: boolean = true;
    showPopupAdicionar: boolean = false;
    showPopupPagamentoManual: boolean = false;
    showPopupTutorial: boolean = true;

    constructor(
        private rest: PresentesService,
        private router: Router,
        private guard: GuardService
    ) { }

    ngOnInit() {
        this.search();
    }

    getMask() {
        if (this.valor)                 Inputmask(this.rest.optionsCurrencyBRLMask).mask(this.valor.nativeElement);
        if (this.valorPagamentoManual)  Inputmask(this.rest.optionsCurrencyBRLMask).mask(this.valorPagamentoManual.nativeElement);
    }

    loadingPosition: any;
    search(filter?: any) {
        this.dsPresentes = [];
        this.loadingPosition = '#gifts';
        setTimeout(() => this.showLoadPanel = true, 10);
        forkJoin([
            this.rest.presentesArea(),
            this.rest.presentes()
        ]).subscribe({
            next: ([presentesArea, presentes]) => {
                this.dsArea = presentesArea;
                this.dsPresentes = presentes.sort(function (a: any, b: any) {
                    return a.prioridade - b.prioridade;
                });

                for (const el of this.dsPresentes) {
                    el.valor = (el.valor - el.vlr_presenteado - el.vlr_processando).toLocaleString('pt-br', { minimumFractionDigits: 2 });
                    if (el.vlr_cota) {
                        el.vlr_cota = el.vlr_cota.toLocaleString('pt-br', { minimumFractionDigits: 2 });
                    }
                }

                if (filter) this.filtrarPresentes(filter);
            }
        }).add(() => {
            this.showLoadPanel = false
        });
    }

    filtrarPresentes(filtro: string) {
        if (!filtro || filtro == 'TODOS') return;

        this.dsPresentes = this.dsPresentes.filter(presente => {
            return filtro == presente.level;
        })
    }

    valueChange(value: any) {
        this.search(value);
    }

    item: any;
    openPopup(event: any) {
        if(event.cancelar ) {
            DialogComponent.confirm('Deseja cancelar a seleção do presente <b><i>' + event.item.nome + '</i></b> ?', 'Cancelar Seleção').subscribe({
                next: response => {
                    if (!response) return;

                    this.showLoadPanel = true;
                    this.rest.cancelarSelecaoPresente(event.item.id).subscribe({
                        next: () => {
                            this.search();
                            Notify.success('Cancelado seleção com sucesso!');
                        }
                    }).add(() => {
                        this.showLoadPanel = false;
                    })
                }
            })
        } else {
            this.item = event.item;
            this.router.navigate(['/presente-detail/' + this.item.id]);
        }
    }

    openPopupAdicionar() {
        this.showPopupAdicionar = true;
        setTimeout(() => this.getMask(), 100)
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

    onPaste(event: ClipboardEvent): void {
        const clipboardData = event.clipboardData;
        const items = clipboardData?.items;

        if (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const file: File = items[i].getAsFile()!;
                    if (file) {
                        this.formAdicionar.file = file;
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.imgUrl = e.target?.result;
                        };
                        reader.readAsDataURL(file);
                    }
                    break;
                }
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
                    }
                })
            }
        });
    }

    dsUsuarios: any;
    openPopupPagamentoManual(item: any) {
        this.showLoadPanel = true;
        this.loadingPosition = '';
        this.rest.getUsuarios().subscribe({
            next: (data) => {
                this.dsUsuarios = data;
                this.formPagamentoManual.nome_presente = item.nome;
                this.formPagamentoManual.presente_id = item.id;
                this.formPagamentoManual.valor = 0;
                this.showPopupPagamentoManual = true;
                setTimeout(() => this.getMask(), 100);
            }
        }).add(() => {
            this.showLoadPanel = false;
        })
    }

    submitAdicionarPagamentoManual() {
        this.showLoadPanel = true;
        this.loadingPosition = '';
        this.formPagamentoManual.valor = TransformHelper.currencyBrlToFloat(this.valorPagamentoManual.nativeElement.inputmask.unmaskedvalue());
        this.rest.adicionarPagamentoManual(this.formPagamentoManual).subscribe({
            next: () => {
                this.showPopupPagamentoManual = false;
                this.formPagamentoManual = {};
                this.search();
                Notify.success('Pagamento adicionado com Sucesso!');
            }
        }).add(() => {
            this.showLoadPanel = false;
        })
    }

    submitAdicionar() {
        this.formAdicionar.valor = TransformHelper.currencyBrlToFloat(this.valor.nativeElement.inputmask.unmaskedvalue());
        this.formAdicionar.tags = JSON.stringify(this.tags);
        this.loadingPosition = '.popup';
        this.showLoadPanel = true;

        this.rest.savePresente(this.formAdicionar).subscribe({
            next: data => {
                this.showPopupAdicionar = false;
                this.imgUrl = null;
                this.formAdicionar = {
                    valor: 0
                };
                this.search();
            }
        }).add(() => {
            this.showLoadPanel = false;
        });
    }

    adicionarTag() {
        if (!this.validationTag()) return;

        this.tags.push({
            id: this.generateUniqueId(),
            nome: this.tag.nome.toUpperCase(),
            descricao: this.tag.descricao
        })
    }

    validationTag(): boolean {
        if (StringHelper.isEmpty(this.tag.nome)) {
            Notify.warning('TAG Precisa de nome');
            return false;
        }

        if (StringHelper.isEmpty(this.tag.descricao)) {
            Notify.warning('TAG Precisa de descrição');
            return false;
        }

        for (const tag of this.tags) {
            if (tag.nome.toUpperCase() == this.tag.nome.toUpperCase()) {
                Notify.warning('TAG Já existente');
                return false;
            }
        }

        return true;
    }

    generateUniqueId(): string {
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 1000000);
        return `${timestamp}${randomNumber}`;
    }

    excluirTag(id:string) {
        this.tags = this.tags.filter(el => { return el.id != id});
    }

}
