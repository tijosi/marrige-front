import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WellcomeMessagem } from 'src/app/enums/HomeEnum';
import { GuardService } from 'src/app/service/guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  bodyMessage: string = '';

  showPopupConfirmPresence: boolean = false;

  user = this.guard.getUser();

  constructor(
    private guard: GuardService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit() {
    this.confirmPresenca();
  }

  getSafeHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.bodyMessage);
  }

  confirmPresenca() {
    if (this.user.role_id != 1) {
      this.showPopupConfirmPresence = true;

      this.user.role_id == 2 ? this.bodyMessage = WellcomeMessagem.PADRINHO : this.bodyMessage = WellcomeMessagem.CONVIDADO;
      this.bodyMessage = this.bodyMessage.replace('{{user.name}}', this.user.name);
    }
  }

  confirmar() {

  }

}
