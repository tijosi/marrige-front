import { AppComponent } from './../../app.component';
import Inputmask from 'inputmask';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import {NgForm} from '@angular/forms';
import { Notify } from 'src/app/template/notify';
import { GuardService } from 'src/app/service/guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('NgForm') NgForm!: NgForm;

  form: any = {};
  showLoadPanel: boolean = false;

  constructor(
    private rest: AccountService,
    private guard: GuardService,
    private router: Router,
    private app: AppComponent
  ){}

  ngOnInit(): void {
    var telefone: any = document.getElementById('telefone');
    Inputmask({"mask": "(99) 99999-9999", jitMasking: true }).mask(telefone);
  }

  submit() {

    if( !this.form.telefone) {
      Notify.warning('O número de telefone deve ser preenchido');
      return;
    }

    if( this.form.telefone.length < 15) {
      Notify.warning('O número de telefone deve conter todos os dígitos');
      return;
    }

    const form = {
      telefone: this.form.telefone.replace(/[^\d]+/g,'')
    }

    this.showLoadPanel = true;
    this.rest.login({...form}).subscribe({
      next: (data: any) => {

        localStorage.clear();
        this.guard.clearUser();
        localStorage.setItem('token', data.token);
        this.showLoadPanel = false;
        this.router.navigate(['']);
        this.app.activeLoading(true);

      },

      error: (e: any) => {
        this.showLoadPanel = false
        Notify.error(e.error.message)
      }
    });


  }
}
