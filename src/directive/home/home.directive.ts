import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHome]',
  standalone: true
})
export class HomeDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('lightblue'); // צבע כאשר העכבר מעל
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(""); // החזרת צבע ברירת מחדל
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
