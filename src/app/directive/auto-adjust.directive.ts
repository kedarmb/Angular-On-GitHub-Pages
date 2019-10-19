import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appAutoAdjust]'
})
export class AutoAdjustDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.addEventListener('keydown', () => {
      this.autosize();
    });
  }

  ngAfterViewInit(): void {
   this.autosize();


  }
   autosize() {
    setTimeout(() => {
        // tslint:disable-next-line:radix
      const height = parseInt(this.elementRef.nativeElement.scrollHeight);
      if (height > 0) {
      this.elementRef.nativeElement.style.height =  this.elementRef.nativeElement.scrollHeight + 'px';
      }
    }, 0);
  }
}
