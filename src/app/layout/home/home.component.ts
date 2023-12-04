import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { GuardService } from 'src/app/service/guard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  faClose = faClose;
  showPopupConfirmPresence: boolean = false;
  nameUser = (this.guard.getUser()).name;

  constructor(
    private guard: GuardService
  ){}

  ngAfterViewInit() {
    this.showPopupConfirmPresence = true;
  }

  ngOnInit() {

  }

  confirmar() {

  }

}
