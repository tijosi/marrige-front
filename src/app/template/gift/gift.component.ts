import { GuardService } from './../../service/guard.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDataSoruceGift } from 'src/app/interface/IGift.interface';

@Component({
    selector: 'app-gift',
    templateUrl: './gift.component.html',
    styleUrls: ['./gift.component.css']
})
export class GiftComponent {

    @Input() dsArea: any[] = [];
    @Input() dataSource: IDataSoruceGift[] = [];

    @Output() btnClick = new EventEmitter<any>();
    @Output() onExlcuir = new EventEmitter<any>();
    @Output() onAddPayment = new EventEmitter<any>();

    isAdmin = this.guard.isAdmin;
    user = this.guard.getUser();

    constructor(
        private guard: GuardService
    ) { }

    ngOnInit() { }

    ngAfterContentInit() { }

    ngOnChanges() { }

    showBtnCancelar(item: any) {
        return Boolean(item.selected_by_user_id == this.user.id || (item.selected_by_user_id && this.user.role_id == 1));
    }

    borderGift(area: any): string {

        const selection = this.dsArea.filter(el => el.id == area);
        return `box-shadow: 0px 0px 5px ${selection[0].color}; border: 1px solid ${selection[0].color} ;`

    }

    bannerStyle(area: any) {

        const selection = this.dsArea.filter(el => el.id == area);
        return `background: ${selection[0].color};`

    }

    getSizeAreaElement(elemento: string, type: string): any {
        if (type == 'width') {
            const style: any = window.getComputedStyle(document.querySelector(elemento)!);
            return `calc(${style.width} - ${style.paddingLeft} - ${style.paddingRight} + 10px)`;
        } else if (type == 'height') {
            const style: any = window.getComputedStyle(document.querySelector(elemento)!);
            return `calc(${style.height} - ${style.paddingTop} - ${style.paddingBottom})`;
        }
    }

    lookup(el: any) {
        var result = null;
        for (let i = 0; i < this.dsArea.length; i++) {
            const element = this.dsArea[i].id;
            if (el == element) result = this.dsArea[i].descricao
        }

        return result;
    }
}
