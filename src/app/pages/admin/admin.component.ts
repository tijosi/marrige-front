import { Component, HostListener, OnInit } from '@angular/core';
import { faArrowDown, faCheck, faBell, faGift } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Notify } from 'src/app/helper/notify';
import { AdminService } from 'src/app/service/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  faArrowDown = faArrowDown;
  faCheck = faCheck;
  faBell = faBell;
  faGift = faGift;

  emptyNotificacoes: boolean = false;
  emptyPresentes: boolean = false;
  showNotificacao: boolean = true;
  showPresentes: boolean = false;
  dsNotificacoes!: any[];
  dsPresentes!: any[];
  dsLevel = [
    {id: 'baixo', name: 'PRATA'},
    {id: 'medio', name: 'ROSEGOLD'},
    {id: 'alto',  name: 'GOLD'}
  ]

  constructor(private rest: AdminService) {}

  ngOnInit(): void {
    this.resetLi();
    this.search();
  }

  async search() {

    if (this.showNotificacao) this.dsNotificacoes = await this.rest.getNotificacoes();
    if (this.showPresentes)   this.dsPresentes    = await this.rest.getPresentes();

    this.dsNotificacoes.length == 0 ? this.emptyNotificacoes = true : this.emptyNotificacoes = false;
    this.dsPresentes.length == 0 ? this.emptyPresentes = true : this.emptyPresentes = false;
  }

  @HostListener('click', ['$event'])
  targetAba($event: Event) {

    const elClicado = $event.target as HTMLElement;

    if (elClicado.tagName == 'LI' || elClicado.tagName == 'fa-icon') {

      this.resetLi(false);

      elClicado.className += ' li-selecionado';

      this.search();
      switch(elClicado.classList[0]) {
        case '0':
          this.showNotificacao = true;
          this.showPresentes = false;
          break

        case '1':
          this.showNotificacao = false;
          this.showPresentes = true;
          break;
      }

    }
  }

  resetLi(first: boolean = true) {
    const allLi = document.querySelectorAll('.dropdown-lista li');

    let i = 0;
    allLi.forEach((el: any) => {

      el.className = i;
      if(first && i == 0) el.className += ' li-selecionado';
      i++
    });
  }

  openNotificacao(item: any) {


    const notConteudo = window.getComputedStyle(document.getElementById('conteudo-' + item.id)!);
    const notBody: HTMLElement = document.getElementById('notificacao-body-' + item.id)!;
    const elClicado: HTMLElement = document.getElementById('notificacao-icon-' + item.id)!;

    if (notBody.className.search('open') < 0) {
      notBody.style.height = notConteudo.height;
      notBody.classList.toggle('open');
      elClicado.innerText = 'Fechar';
    } else {
      notBody.style.height = '0';
      notBody.classList.toggle('open');
      elClicado.innerText = 'Abrir'
    }

    if(!item.entregue) {
      this.rest.getNotificacoes(item.id);
      item.entregue = 1;
    }
  }

  confirmNotificacao(item: any) {
    const elAbrir: HTMLElement = document.getElementById('notificacao-icon-' + item.id)!;

    const time = elAbrir.innerText == 'fechar' ? 300 : 0;
    if (elAbrir.innerText == 'fechar') this.openNotificacao(item);

    setTimeout(() => {

      if (item.entregue == 0) {
        this.openNotificacao(item);
        return;
      }

      this.rest.getNotificacoes(item.id, true);

      const notificacao: HTMLElement = document.getElementById('notificacao-' + item.id)!;
      notificacao.style.scale = '0';
      notificacao.style.opacity = '0';

      this.search();

    }, time);
  }

  tranformDate = (date: any) => 'Registrado em: ' + moment(date).format('DD-MM-YYYY HH:mm:ss');

  lookup(el: any) {
    var result = null;
    for (let i = 0; i < this.dsLevel.length; i++) {
      const element = this.dsLevel[i].id;
      if (el == element) result = this.dsLevel[i].name
    }

    return result;
  }

  getSizeAreaElement(elemento: string, type: string): any {
    if(type == 'width') {
      const style: any = window.getComputedStyle(document.querySelector(elemento)!);
      return `calc(${style.width} - ${style.paddingLeft} - ${style.paddingRight} + 10px)`;
    } else if(type == 'height') {
      const style: any = window.getComputedStyle(document.querySelector(elemento)!);
      return `calc(${style.height} - ${style.paddingTop} - ${style.paddingBottom})`;
    }
  }

  item: any;
  showPopup: boolean = false;
  openPopup(item: any) {
    this.item = item;
    this.showPopup = true;
  }

  async submitConfirmar() {

    try {
      await this.rest.desvincularPresente(this.item.id);
      this.search();
      this.showPopup = false;
      this.item = null;
    } catch (error) {
      Notify.error('Erro ao tentar desvincular');
    }

  }
}
