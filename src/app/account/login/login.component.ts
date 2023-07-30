import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faInfoCircle, faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../shared/account.service';
import {NgForm} from '@angular/forms';
import { Notify } from 'src/app/helper/notify';
import { catchError, of } from 'rxjs';

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
    name: null,
    password: null
  }

  password: string = 'password';

  constructor(
    private router: Router,
    private rest: AccountService
  ){}

  ngOnInit(): void {
  }

  popupPassword() {
    this.showPopupPassword = !this.showPopupPassword;
  }

  notify: boolean = false;
  async submit() {

    if( !this.form.name || !this.form.password) {
      Notify.error('Os campos devem ser preenchidos!');
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

    if(this.showPassword == faEye){
      this.password = 'text';
      this.showPassword = faEyeSlash;
    } else {
      this.password = 'password';
      this.showPassword = faEye;
    }
  }
}
