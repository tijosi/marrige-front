import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements AfterViewInit {

  @Input() visible: boolean = false;
  @Input() position!: string;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.load();
    }, 100);
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

    if (this.position == null || this.position == '') {
      const elNative: any = document.querySelector('.container-loading');

      elNative.style.top = '0px';
      elNative.style.left = '0px';
      elNative.style.width = '100vw';
      elNative.style.height = '100vh';
      return;
    };

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
