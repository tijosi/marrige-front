import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars, faClose, faGifts, faUsers, faUserTie, faSignOutAlt, faHome, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { GuardService } from 'src/app/service/guard.service';
import { HeaderService } from 'src/app/service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  icon = faBars;
  faGifts = faGifts;
  faUsers = faUsers;
  faUserTie = faUserTie;
  faSignOutAlt = faSignOutAlt;
  faHome = faHome;
  faUserSecret = faUserSecret;
  isAdmin = this.guard.isAdmin;

  computadorMode = false;
  widthDropdown: string = '';

  stringsRoutes: any[] = [
    {id: 0, route: ''},
    {id: 1, route: 'presentes'},
    {id: 2, route: 'convidados'},
    {id: 3, route: 'padrinhos'},
    {id: 4, route: 'admin'}
  ]

  constructor(
    private route: Router,
    private rest: HeaderService,
    private guard: GuardService
  ) {
  }

  async ngOnInit() {
    this.search();
    console.log(this.isAdmin);
  }

  search() {
    this.getWidthDropdown();
    this.aba(null, true);
  }

  aba(aba: any = null, first = false) {
    const pathName = window.location.pathname;
    let abaString = aba == null ? pathName.replace('/', "") : aba;
    const time = first ? 1000 : 0;

    setTimeout(() => {
      const items = document.querySelectorAll('.item');

      items.forEach( el => {

      if (el.className != 'item sair' && el.className != 'item padrinho') el.className = 'item';

      });

      this.stringsRoutes.forEach( el => {

        if (el.route == abaString) items[el.id].classList.add('item-selected');

      });
    }, time)

  }

  oldWidthScreen!: string
  getWidthDropdown() {
    // console.log('getWidthDropdown', 'header');
    const styleScreen = window.getComputedStyle(document.documentElement.querySelector('.html-container')!);
    if(this.oldWidthScreen == styleScreen.width) return

    this.oldWidthScreen = styleScreen.width;

    if (styleScreen.width > '499px'){
      this.computadorMode = true
      this.widthDropdown = '400px'
    }  else {
      this.computadorMode = false;
      this.widthDropdown = '80%'
    }

    if (this.iconBars == "bars open") this.openDropdown();
  }

  iconBars: string = 'bars'
  openDropdown() {
    this.getWidthDropdown();

    const dropdown: HTMLElement = document.querySelector('.navbar-dropdown')!;
    const style = dropdown.style
    const domElement: HTMLElement = document.documentElement.querySelector('.html-container')!;

    if (style.right == '100%' || style.right == "" ) {

      domElement.style.overflow = 'hidden';
      this.iconBars += ' open';
      this.icon = faClose;
      style.right = this.computadorMode ? '100px' : '20%'

    } else {

      domElement.style.overflow = 'scroll'
      this.icon = faBars;
      style.right = '100%';
      this.iconBars = 'bars';

    }

  }

  exitAcount() {
    this.openDropdown();
    setTimeout(() => {
      window.location.reload();
      localStorage.clear();
    }, 300);
  }

  routes(nav: string) {
    this.openDropdown();

    setTimeout(() => { this.route.navigate([nav]) }, 300);
    setTimeout(() => { this.aba(nav) }, 500);
  }

}
