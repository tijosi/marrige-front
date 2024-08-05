import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faGifts, faUsers, faUserTie, faSignOutAlt, faHome, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { WellcomeMessagem } from 'src/app/enums/HomeEnum';
import { GuardService } from 'src/app/service/guard.service';
import { HeaderService } from 'src/app/service/header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    user = this.guard.getUser();

    faGifts = faGifts;
    faUsers = faUsers;
    faUserTie = faUserTie;
    faSignOutAlt = faSignOutAlt;
    faHome = faHome;
    faUserSecret = faUserSecret;
    isAdmin = this.guard.isAdmin;

    bodyMessage: string = '';
    widthDropdown: string = '';
    classNavbar: string = '';
    classMenu: string = 'bars fas fa-bars';

    computadorMode: boolean = false;
    showPopupConfirmPresence: boolean = false;

    constructor(
        private router: Router,
        private guard: GuardService,
        private sanitizer: DomSanitizer
    ) {
    }

    async ngOnInit() {
        this.search();
    }

    search() {
        // if (this.guard.getConfirmRead() == 0) {
        //     this.bodyMessage = (this.user && this.user.role_id == 2) ? WellcomeMessagem.PADRINHO : WellcomeMessagem.CONVIDADO
        //     this.bodyMessage = this.bodyMessage.replace('{{name}}', this.user.name);
        //     this.showPopupConfirmPresence = true
        // }
    }

    openDropdown(exit: boolean = false) {
        const domElement: HTMLElement = document.documentElement.querySelector('.html-container')!;

        if (this.classMenu == "bars fas fa-bars" && !exit) {
            this.classMenu = 'close fas fa-close';
            this.classNavbar = 'open';
            domElement.style.overflowY = 'hidden'
        } else {
            this.classMenu = 'bars fas fa-bars';
            this.classNavbar = '';
            domElement.style.overflowY = 'scroll'
        }
    }

    getSafeHtml() {
        return this.sanitizer.bypassSecurityTrustHtml(this.bodyMessage);
    }

    confirmar(){
        this.guard.setConfirmRead(true);
        this.showPopupConfirmPresence = false;
    }

    exitAcount() {
        this.openDropdown(true);
        setTimeout(() => {
            localStorage.clear();
            this.guard.clearUser();
            this.router.navigate(['/login']);
        }, 300);
    }

    routes(nav: string) {
        this.openDropdown();
        setTimeout(() => { this.router.navigate([nav]) }, 300);
    }

}
