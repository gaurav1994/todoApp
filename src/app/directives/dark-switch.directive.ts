import { AuthService } from 'src/app/service/auth.service';
import { Directive, Input, HostBinding , HostListener, Renderer2, OnInit, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDarkSwitch]'
})
export class DarkSwitchDirective implements OnInit{

  constructor(private _render : Renderer2, private _auth : AuthService, private el : ElementRef) { }

  ngOnInit(){
     let themevalue = this._auth.theme
     this.theme = themevalue
     this._render.setAttribute(document.body, 'data-theme', this.theme)
     if(this.theme == 'light'){
          this._render.setAttribute(this.el.nativeElement, 'checked', "false")
          this._render.removeAttribute(this.el.nativeElement, 'checked')
     }else{
          this._render.setAttribute(this.el.nativeElement, 'checked', "true")
          this._render.setAttribute(this.el.nativeElement, 'checked' , 'checked')
     }
  }
  @HostBinding('attr.data-theme') theme ;
  @HostListener('change') onChange(){
       if(this.theme=='light'){
          this.theme = 'dark'
          this._render.setAttribute(document.body, 'data-theme', 'dark')
          this._render.setAttribute(this.el.nativeElement, 'checked' , 'checked')
       }else{
            this.theme = 'light'
          this._render.setAttribute(document.body, 'data-theme', 'light')
          this._render.removeAttribute(this.el.nativeElement, 'checked')
       }
  }

}
