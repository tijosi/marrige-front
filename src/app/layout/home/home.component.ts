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
  user = this.guard.getUser();

  constructor(
    private guard: GuardService
  ){}

  ngOnInit() {
    this.showPopupConfirmPresence = true;
  }

  get getClassName() {
    return this.user.id == 2 ? 'princesa' :  '';
  }

  confirmar() {

  }

}
