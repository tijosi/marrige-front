import { Component } from '@angular/core';

@Component({
  selector: 'app-padrinhos',
  templateUrl: './padrinhos.component.html',
  styleUrls: ['./padrinhos.component.css']
})
export class PadrinhosComponent {

    dsPadrinhos: any[] = [
        {nome: 'Dhavid Paes barbosa',   imagemUrl: '../../../assets/photos-banner/foto1.png'},
        {nome: 'Uanderson Balbino',     imagemUrl: '../../../assets/photos-banner/foto2.png'},
        {nome: 'Carlos Eduardo',        imagemUrl: '../../../assets/photos-banner/foto3.png'},
        {nome: 'Silvano Barcelos',      imagemUrl: '../../../assets/photos-banner/foto4.png'},
        {nome: 'Leonardo Guedes',       imagemUrl: '../../../assets/photos/edson.png'},
    ]

}
