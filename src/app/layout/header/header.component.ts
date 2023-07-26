import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faClose, faGifts, faUsers, faUserTie, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';

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

  computadorMode = false;
  widthDropdown: string = '';

  constructor(private route: Router) {

  }

  ngOnInit():void {
    setInterval(() => this.getWidthDropdown(), 100);
  }

  oldWidthScreen!: string
  getWidthDropdown() {
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
    const dropdown: HTMLElement = document.querySelector('.navbar-dropdown')!;
    const style = dropdown.style
    const styleScreen = window.getComputedStyle(document.documentElement.querySelector('.html-container')!);
    const domElement: any = styleScreen.width > '499px' ? document.documentElement.querySelector('.html-container') : document.documentElement;

    if (style.right == '100%' || style.right == "" ) {

      domElement!.style.overflow = 'hidden';
      this.iconBars += ' open';
      this.icon = faClose;
      style.right = this.computadorMode ? '100px' : '20%'

    } else {

      domElement!.style.overflow = 'scroll'
      this.icon = faBars;
      style.right = '100%';
      this.iconBars = 'bars';

    }

  }

  exitAcount() {
    localStorage.clear();
    this.openDropdown();
    document.documentElement.style.overflow = 'scroll';
    this.route.navigate(['login']);
  }

  routes(nav: string) {
    this.openDropdown();
    setTimeout(() => { this.route.navigate([nav]) }, 300)
  }

}
