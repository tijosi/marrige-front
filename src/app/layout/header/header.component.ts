import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faGifts, faUsers, faUserTie, faSignOutAlt, faHome, faUserSecret } from '@fortawesome/free-solid-svg-icons';
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

    stringsRoutes: any[] = [
        { id: 0, route: '' },
        { id: 1, route: 'presentes' },
        { id: 2, route: 'padrinhos' },
    ]

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
        this.aba(null, true);
    }

    aba(aba: any = null, first = false) {

        const pathName = window.location.pathname;
        let abaString = aba == null ? pathName.replace('/', "") : aba;
        const time = first ? 1000 : 0;

        setTimeout(() => {
            const items = document.querySelectorAll('.item');

            items.forEach(el => {
                if (el.className != 'item sair' && el.className != 'item padrinho') el.className = 'item';
            });

            this.stringsRoutes.forEach(el => {
                if (el.route == abaString) items[el.id].classList.add('item-selected');
            });
        }, time)

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

    confirmPresenca() {
        setTimeout(() => {
            if (!this.isAdmin) {
                this.showPopupConfirmPresence = true;
                this.bodyMessage = this.bodyMessage.replace('{{name}}', this.user.name);
            }
        }, 400);
    }

    confirmar(){}

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
        setTimeout(() => { this.aba(nav) }, 500);
    }

}
