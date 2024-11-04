import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/app/service/guard.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    user = this.guard.getUser();

    showHeader: boolean = false;

    constructor(
        private router: Router,
        private guard: GuardService
    ) {}

    ngOnInit(): void {
        console.log(window.location.pathname);
        this.showHeader = (window.location.pathname !== '/cha-panela') && this.user;
    }
}
