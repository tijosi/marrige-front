import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  faClose = faClose;
  showBtnConfirmarPresenca: boolean = false;

  constructor(){
  }

  ngOnInit() {
    setTimeout(() => this.showBtnConfirmarPresenca = true, 2000);
  }

}
