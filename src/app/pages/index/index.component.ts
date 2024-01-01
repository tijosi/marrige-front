import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterViewInit {

  faRetweet = faRetweet;

  pathImg: any[] = [
    '/assets/banner-vertical-transparent.png',
    '/assets/hexagono-dourado.png',
  ];

  pathImgCarrousel: string[] = [
    '/assets/photos-banner/foto1.png',
    '/assets/photos-banner/foto2.png',
    '/assets/photos-banner/foto3.png',
    '/assets/photos-banner/foto4.png',
  ]

  pathImgNoivos: string[] = [
    '/assets/photos/edson.png',
    '/assets/photos/swelen.png',
  ]

  windowsWidth: any;
  day!: HTMLElement;
  hour!: HTMLElement;
  min!: HTMLElement;
  sec!: HTMLElement;

  dayCount!: number;
  hourCount!: number;
  minCount!: number;
  secCount!: number;
  timerWriting!: number;
  timeStart!: number;
  indice!: number;
  i!: number;
  posInitial: number = 0;

  people!: any;

  loadingWriting: boolean = false;
  closingWrite: boolean = false;

  dateFinal: Date = new Date('11 16 2024 00:00:00');
  dateNow!: Date;

  inteval: any;

  constructor() {}

  ngOnInit(): void {
    this.elementsCounter();
    this.runCounter;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.heightCard(), 1000);
    this.inteval = setInterval(this.runCounter, 1000);
  }

  elementsCounter() {
    this.day = document.querySelector('#day')!;
    this.hour = document.querySelector('#hour')!;
    this.min = document.querySelector('#min')!;
    this.sec = document.querySelector('#sec')!;
  }

  runCounter = () => {
    if (window.location.pathname != '/') {
      console.log('height interrompido', window.location.pathname);
      clearInterval(this.inteval);
      return;
    }

    this.dateNow = new Date();
    const diff: number = Number(this.dateFinal) - Number(this.dateNow);
    if(diff > 0){
      this.dayCount = this.setTwoDig(Math.floor(diff/1000/60/60/24));
      this.hourCount = this.setTwoDig(Math.floor((diff/1000/60/60)%24));
      this.minCount = this.setTwoDig(Math.floor((diff/1000/60)%60));
      this.secCount = this.setTwoDig(Math.floor((diff/1000)%60));
    } else { this.inteval = 0 }

  }

  setTwoDig = (arg: number): any => arg > 9 ? arg : '0'+arg;

  closeDetailsCard(people: string) {
    if(people) {
      const flipCard = document.querySelector('.flip-card-inner-'+people)!;
      flipCard.classList.toggle('rotate-active');
    }

    if(this.loadingWriting) {
      this.closingWrite = true;
      this.people = null;
      this.loadingWriting = false;
    }

  }

  detailsCard(people: string) {
    if(this.people) this.closeDetailsCard(this.people);

    if(this.closingWrite) {
      setTimeout(()=>{
        this.detailsCard(people);
      });
      return;
    }

    this.timeStart = 2000
    this.indice = 0;
    this.i = 0;
    this.people = people;

    let flipCard = document.querySelector('.flip-card-inner-'+this.people)!;
    flipCard.classList.toggle('rotate-active');
    this.toWrite(this.people);
  }

  toWrite(people: string) {

    const cardBack = document.querySelector('.card-back-'+people);
    const tagsP = cardBack!.getElementsByTagName('p');
    const txtArray = [];
    const timeP = [];

    for (let i = 0; (i <= tagsP.length-1) ; i++) {
      txtArray.push(tagsP[i].innerText);
      tagsP[i].innerHTML = '';
      tagsP[i].className = '';
      timeP.push({pause: Math.floor(Math.random()*3000)});
    }

    this.loadingWriting = true;
    this.writing(timeP, txtArray, tagsP);
  }

  writing(timeP:any, txtArray: any, tagsP: any) {
      if(this.indice == 0 && this.i == 0) this.timerWriting = this.timeStart;
      if(this.timerWriting > 500) tagsP[this.indice].className = 'write';

    setTimeout(() => {
      tagsP[this.indice].className = 'static';

      if( this.i <= txtArray[this.indice].length && this.loadingWriting) {

        tagsP[this.indice].innerHTML = txtArray[this.indice].slice(0, this.i + 1);
        this.i++;

        if(this.indice == txtArray.length -1) this.timerWriting = 200;
        else if(this.posInitial == this.i) this.timerWriting = Math.floor(Math.random() * 500) + 500;
        else this.timerWriting = 35;

        this.writing(timeP, txtArray, tagsP);

      } else if(!this.loadingWriting) {
        setTimeout(()=> {
          for (let i = 0; i < tagsP.length; i++) {
            tagsP[i].innerHTML = txtArray[i];
            tagsP[i].className = '';
          }
        }, 500);
        this.closingWrite = false;
      } else if (this.indice < tagsP.length-1) {
        tagsP[this.indice].className = '';
        this.timerWriting = timeP[this.indice].pause
        this.i = 0;
        this.indice++;
        tagsP[this.indice].className = 'write';
        this.writing(timeP, txtArray, tagsP);
      }  else {
        tagsP[this.indice].className = 'write'
        this.loadingWriting = false;
      }
    }, this.timerWriting)
  }

  heightCard() {
    let card: HTMLElement = document.querySelector('.card')!;
    let flipCard = document.querySelectorAll('.flip-card')!;
    let cardBackNoivo: HTMLElement = document.querySelector('.card-back-noivo')!;
    let cardBackNoiva: HTMLElement = document.querySelector('.card-back-noiva')!;
    cardBackNoiva.style.height = card.clientHeight + 'px'
    cardBackNoivo.style.height = card.clientHeight + 'px'

    flipCard.forEach((el: any) => {
      el.style.height = card.clientHeight + 'px'
    });

  }

}
