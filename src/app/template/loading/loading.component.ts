import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements AfterViewInit {

  @Input() visible: boolean = true;
  @Input() position!: string;

  constructor() {}

  ngAfterViewInit() {
    this.load();
  }

  ngOnChanges() {
    this.load();
  }

  load() {
    this.setPosition();
    this.setVisible();
  }

  private setVisible() {
    const elNative: any = document.querySelector('.container-loading');

    if (!this.visible) {
      elNative!.classList.add('close');
    } else {
      elNative!.classList.remove('close');
    }
  }

  private setPosition() {
    const element: any = document.querySelector(this.position);
    if (element) {
      const rect = element.getBoundingClientRect();
      const elNative: any = document.querySelector('.container-loading');

      elNative.style.top = rect.top + 'px';
      elNative.style.left = rect.left + 'px';
      elNative.style.width = element.offsetWidth + 'px';
      elNative.style.height = element.offsetHeight + 'px';

    }
  }
}