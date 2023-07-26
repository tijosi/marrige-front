import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(){
  }

  ngOnInit(): void {
    // const styleScreen = window.getComputedStyle(document.documentElement.querySelector('.html-container')!);
    // const elContainerPattern: any = document.querySelector('.container-pattern');
    // if (styleScreen.width > '499px') elContainerPattern!.className += '.hidden';
  }

}
