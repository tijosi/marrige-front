import { Component, OnInit } from '@angular/core';
import { PadrinhosService } from 'src/app/service/PadrinhosService';
import { GuardService } from 'src/app/service/guard.service';

@Component({
  selector: 'app-padrinhos',
  templateUrl: './padrinhos.component.html',
  styleUrls: ['./padrinhos.component.css']
})
export class PadrinhosComponent implements OnInit {

    dsPadrinhos: any[] = [];

    pathImgCarrousel: any[] = [
        '../../../assets/photos-padrinhos/transferir (4).jfif.jpg',
        '../../../assets/photos-padrinhos/Ivory dress with a groom wearing a White Tuxedo jacket___.jfif.jpg',
        '../../../assets/photos-padrinhos/Lucy Struve Photography_ Austin Wedding Photographer.jfif.jpg'
    ];

    user: any = this.guard.getUser();

    constructor(
        private guard: GuardService,
        private rest: PadrinhosService
    ) {}

    ngOnInit(): void {
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
        });
    }

    search() {
        this.rest.getPadrinhos().subscribe({
            next: data => {
                this.dsPadrinhos = data;
            },
        }).add(()=> {
            setTimeout(() => {
                this.setAnimationScroll();
            }, 100);
        });
    }
}
