import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    showHeader: boolean = true;

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            this.showHeader = this.router.url !== '/cha-panela';
        });
      }
}
