import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Notify } from 'src/app/template/notify';
import { PresentesService } from 'src/app/service/presentes.service';
import { TransformHelper } from 'src/app/helper/TransformHelper';
import { GuardService } from 'src/app/service/guard.service';
import { DialogComponent } from 'src/app/template/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-presentes',
    templateUrl: './presentes.component.html',
    styleUrls: ['./presentes.component.css']
})
export class PresentesComponent implements OnInit {

    @ViewChild('vlr_minimo') vlr_minimo!: ElementRef
    @ViewChild('vlr_maximo') vlr_maximo!: ElementRef

    dsPresentes: any[] = [];
    dsArea: any[] = [];

    isAdmin = this.guard.isAdmin;

    imgUrl!: any;
    formAdicionar: any = {
        vlr_minimo: 0,
        vlr_maximo: 0
    };
    tag: any = {
        nome: null,
        descricao: null,
        validate: false
    };
    tags: any[] = [];

    showLoadPanel: boolean = true;
    showPopupAdicionar: boolean = false;


    constructor(
        private rest: PresentesService,
        private router: Router,
        private guard: GuardService
    ) { }

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

                this.dsPresentes = data.sort(function (a: any, b: any) {
                    return b.valor - a.valor;
                });

                for (const el of this.dsPresentes) {
                    el.valor = el.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 });
                }
                this.showLoadPanel = false;
            },
            error: e => {
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
        this.router.navigate(['/presente-detail/' + item.id]);
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
                    const blob = items[i].getAsFile();
                    if (blob) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.imgUrl = e.target?.result;
                        };
                        reader.readAsDataURL(blob);
                    }
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
                    vlr_minimo: 0,
                    vlr_maximo: 0
                };
                this.search();
            },

            error: e => {
                Notify.error(e.error.message)
                this.showLoadPanel = false;
            }
        });
    }

    adicionarTag() {
        for (const tag of this.tags) {
            if (tag.nome == this.tag.nome) {
                Notify.error('TAG Já existente');
                return;
            }
        }
        this.tags.push({
            id: Math.random()*10000000000,
            nome: this.tag.nome,
            descricao: this.tag.descricao
        })
    }

    excluirTag(id:string) {
        this.tags = this.tags.filter(el => { return el.id != id});
    }

}
