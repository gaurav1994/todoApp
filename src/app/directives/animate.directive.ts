import { Directive, HostBinding, Input, OnInit, 
     OnChanges,  ElementRef } from '@angular/core';

@Directive({
  selector: '[appAnimate]'
})
export class AnimateDirective implements OnInit, OnChanges {

     @Input('settings') settings ;
     @Input('animate') animate ;
  constructor(private el : ElementRef) {
   }
  @HostBinding('class.animate__bounceInRight') enterAnimation ;
  @HostBinding('class.animate__bounceOutRight') exitAnimation ;
  ngOnInit(){
       this.enterAnimation = false;
       this.exitAnimation = false;
       this.el.nativeElement.hidden = true
  }
  ngOnChanges(){
     if(this.settings == false){
          this.enterAnimation = false
          this.exitAnimation = true
          this.el.nativeElement.hidden = false
     } 
     if(this.settings == true){
          this.enterAnimation = true
          this.exitAnimation = false;
          this.el.nativeElement.hidden = false
     }
  }
}
