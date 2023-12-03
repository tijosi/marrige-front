import Inputmask from 'inputmask';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
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
    private rest: AccountService,
    private router: Router
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
      Notify.error('O número de telefone deve conter todos os dígitos');
      return;
    }

    const form = {
      telefone: this.form.telefone.replace(/[^\d]+/g,'')
    }

    this.rest.login({...form}).subscribe({
      next: (data: any) => {
        localStorage.clear();
        localStorage.setItem('token', data.token);
        this.router.navigate(['']);
      },

      error: (e: any) => Notify.error(e.error.message)
    });
  }
}
