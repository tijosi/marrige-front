import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements AfterViewInit {

  @ViewChild('loadingContainer') loadingContainer!: ElementRef;
  @Input() visible: boolean = true;
  @Input() position!: string;

  constructor( private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.position) {
      const element = document.querySelector(this.position);
      if (element) {
        this.renderer.appendChild(element, this.loadingContainer.nativeElement)
      }
    }
    this.renderer.setStyle(this.loadingContainer.nativeElement, 'top', `0`);
    this.renderer.setStyle(this.loadingContainer.nativeElement, 'left', `0`);
    this.renderer.setStyle(this.loadingContainer.nativeElement, 'height', `100%`);
    this.renderer.setStyle(this.loadingContainer.nativeElement, 'width', `100%`);
  }
}
