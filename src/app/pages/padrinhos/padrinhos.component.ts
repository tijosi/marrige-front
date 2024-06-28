import { Component, OnInit } from '@angular/core';
import { PadrinhosService } from 'src/app/service/PadrinhosService';
import { GuardService } from 'src/app/service/guard.service';
import { Notify } from 'src/app/template/notify';

@Component({
  selector: 'app-padrinhos',
  templateUrl: './padrinhos.component.html',
  styleUrls: ['./padrinhos.component.css']
})
export class PadrinhosComponent implements OnInit {

    dsPadrinhos: any[] = [
        {nome: 'Dhavid Paes barbosa',   imagemUrl: '../../../assets/photos-banner/foto1.png'},
        {nome: 'Uanderson Balbino',     imagemUrl: '../../../assets/photos-banner/foto2.png'},
        {nome: 'Carlos Eduardo',        imagemUrl: '../../../assets/photos-banner/foto3.png'},
        {nome: 'Silvano Barcelos',      imagemUrl: '../../../assets/photos-banner/foto4.png'},
        {nome: 'Leonardo Guedes',       imagemUrl: '../../../assets/photos/edson.png'},
        {nome: 'Dhavid Paes barbosa',   imagemUrl: '../../../assets/photos-banner/foto1.png'},
        {nome: 'Uanderson Balbino',     imagemUrl: '../../../assets/photos-banner/foto2.png'},
        {nome: 'Carlos Eduardo',        imagemUrl: '../../../assets/photos-banner/foto3.png'},
        {nome: 'Silvano Barcelos',      imagemUrl: '../../../assets/photos-banner/foto4.png'},
        {nome: 'Leonardo Guedes',       imagemUrl: '../../../assets/photos/edson.png'},
        {nome: 'Dhavid Paes barbosa',   imagemUrl: '../../../assets/photos-banner/foto1.png'},
        {nome: 'Uanderson Balbino',     imagemUrl: '../../../assets/photos-banner/foto2.png'},
        {nome: 'Carlos Eduardo',        imagemUrl: '../../../assets/photos-banner/foto3.png'},
        {nome: 'Silvano Barcelos',      imagemUrl: '../../../assets/photos-banner/foto4.png'},
        {nome: 'Leonardo Guedes',       imagemUrl: '../../../assets/photos/edson.png'},
    ]

    user: any = this.guard.getUser();

    constructor(
        private guard: GuardService,
        private rest: PadrinhosService
    ) {}

    ngOnInit(): void {
        this.setAnimationScroll();
        this.search();
    }

    setAnimationScroll() {
        (document.getElementById('screen'))!.addEventListener('scroll', () => {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            var element = document.getElementById('manual-padrinhos');
            var elementOffset = element!.getBoundingClientRect().top + scrollTop;
            var distance = elementOffset - scrollTop;

            if (distance < window.innerHeight / 1.5) {
                element!.classList.add('visible');
            }

            var elementInspiracoes = document.getElementById('inspiracoes');
            var elementOffsetInspiracoes = elementInspiracoes!.getBoundingClientRect().top + scrollTop;
            var distanceInspiracoes = elementOffsetInspiracoes - scrollTop;

            if (distanceInspiracoes < window.innerHeight / 5) {
                elementInspiracoes!.classList.add('visible');
            }
        });
    }

    search() {
        this.rest.getPadrinhos().subscribe({
            next: data => {}
        });
    }
}
