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

      const height = parseInt(this.elementRef.nativeElement.scrollHeight,10);

      if (height > 0) {
        this.elementRef.nativeElement.style.cssText = 'height : ' + this.elementRef.nativeElement.scrollHeight + 'px !important';
      }
    }, 0);
  }
}
