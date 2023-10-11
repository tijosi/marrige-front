import Inputmask from 'inputmask';
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

  form: any = {};

  constructor(
    private rest: AccountService
  ){}

  ngOnInit(): void {
    var telefone: any = document.getElementById('telefone');
    Inputmask({"mask": "(99) 99999-9999", jitMasking: true }).mask(telefone);
  }

  async submit() {

    if( !this.form.telefone) {
      Notify.error('O número deve ser preenchido');
      return;
    }

    if( this.form.telefone.length < 15) {
      console.log(this.form.telefone);
      Notify.error('O número de telefone deve conter todos os dígitos');
      return;
    }

    try {
      const form = {
        telefone: this.form.telefone.replace(/[^\d]+/g,'')
      }
      await this.rest.login({...form});
    } catch (error) {
      Notify.error('Erro ao tentar fazer conexão');
    }

  }
}
