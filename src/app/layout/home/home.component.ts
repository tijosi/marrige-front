import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    active: boolean = true;
    dtNow: Date = new Date();

    constructor() {
        if (this.dtNow.getHours() > 9 && this.dtNow.getHours() < 0) this.active = true;
        else this.active = false;
    }

    ngOnInit() { }

}
