import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faInfoCircle, faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../shared/account.service';
import {NgForm} from '@angular/forms';
import { Notify } from 'src/app/helper/notify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('NgForm') NgForm!: NgForm;

  faInfoCircle = faInfoCircle;
  faClose = faClose;
  showPassword = faEye;

  showPopupPassword = false;

  form: any = {
    chave: null
  }

  password: string = 'text';

  constructor(
    private router: Router,
    private rest: AccountService
  ){}

  ngOnInit(): void {
  }

  async submit() {

    if( !this.form.chave) {
      Notify.error('A chave deve ser preenchida');
      return;
    }

    try {
      await this.rest.login(this.form);
    } catch (error) {
      Notify.error('Erro ao tentar fazer conexão');
    }

    this.router.navigate(['']);
  }

  visiblePassword() {

    if(this.showPassword != faEye){
      this.password = 'text';
      this.showPassword = faEye;
    } else {
      this.password = 'password';
      this.showPassword = faEyeSlash;
    }
  }
}
