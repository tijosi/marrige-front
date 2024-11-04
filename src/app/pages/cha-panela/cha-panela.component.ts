import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Notify } from 'src/app/template/notify';
import { PresentesService } from 'src/app/service/presentes.service';
import { TransformHelper } from 'src/app/helper/TransformHelper';
import { GuardService } from 'src/app/service/guard.service';
import { DialogComponent } from 'src/app/template/dialog/dialog.component';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cha-panela',
  templateUrl: './cha-panela.component.html',
  styleUrls: ['./cha-panela.component.css']
})
export class ChaPanelaComponent {

    dsPresentes: any[] = [];
    dsChaPanelaEnum: any[] = [];

    isAdmin = this.guard.isAdmin;

    imgUrl!: any;
    formAdicionar: any = {};
    formConfirmarPresente: any = {};

    showPopupConfirmarPresente: boolean = false;
    showLoadPanel: boolean = true;
    showPopupAdicionar: boolean = false;

    constructor(
        private rest: PresentesService,
        private router: Router,
        private guard: GuardService
    ) { }

    ngOnInit() {
        this.search();
    }

    loadingPosition: any;
    search() {
        setTimeout(() => this.showLoadPanel = true, 20) ;
        forkJoin([
            this.rest.chaPanelaEnum(),
            this.rest.presentesChaPanela()
        ]).subscribe({
            next: ([chaPanelaEnum, presentesChaPanela]) => {
                this.dsChaPanelaEnum = chaPanelaEnum;
                this.dsPresentes = presentesChaPanela.filter((el: any) => (el.level == this.dsChaPanelaEnum[0].descricao || el.level == this.dsChaPanelaEnum[1].descricao));
            }
        }).add(() => {
            this.showLoadPanel = false
        });
    }

    item: any;
    openPopup(event: any) {
        if(event.cancelar) {
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
            this.showPopupConfirmarPresente = true;
            this.formConfirmarPresente.presenteId = event.item.id;
        }
    }

    openPopupAdicionar() {
        this.showPopupAdicionar = true;
        this.formAdicionar = {
            categoria: this.dsChaPanelaEnum[0].id
        };
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

                this.showLoadPanel = true;
                this.rest.excluirPresente(item.id).subscribe({
                    next: () => {
                        this.showLoadPanel = false;
                        this.search();
                        Notify.success('Presente ' + item.nome + ' excluído com Sucesso!');
                    },
                    error: (e: any) => {
                        this.showLoadPanel = false;
                    }
                })
            }
        });
    }

    submitAdicionar() {
        this.showLoadPanel = true;

        this.formAdicionar.chaPanela = 1;
        this.rest.savePresente(this.formAdicionar).subscribe({
            next: data => {
                this.imgUrl = null;
                this.search();
            }
        }).add(() => {
            this.showLoadPanel = false;
        });
    }

    submitConfirmarPresente() {
        if (!this.formConfirmarPresente.nome) {
            Notify.error('Digite seu nome');
            return;
        }

        this.showLoadPanel = true;
        this.rest.confirmarPresenteChaPanela(this.formConfirmarPresente).subscribe({
            next: data => {
                this.showPopupConfirmarPresente = false;
                this.search();
            }
        }).add(() => {
            this.showLoadPanel = false;
        });
    }
}
