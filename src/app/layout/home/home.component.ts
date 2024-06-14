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

  constructor(){}

  ngOnInit() {}


}
