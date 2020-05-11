import { AuthService } from 'src/app/service/auth.service';
import { Directive, Input, HostBinding , HostListener, Renderer2, OnInit, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDarkSwitch]'
})
export class DarkSwitchDirective implements OnInit{

  constructor(private _render : Renderer2, private _auth : AuthService, private el : ElementRef) { }

  themevalue : string;
  ngOnInit(){
     this.themevalue = this._auth.theme
     this.setTheme(this.themevalue)
  }

//   @HostBinding('attr.checked') isCheckedDarkTheme = true ;
  @HostListener('change') onChange(){
     if(this.themevalue == 'light')
          this.setTheme('dark')
     else
          this.setTheme('light')
  }
  setTheme(themeValue : string){
     if(themeValue == 'light'){
          this.setLightTheme()
     }else{
          this.setBlackTheme()
     }
  }
  setBlackTheme(){
     this._render.setAttribute(document.body, 'data-theme', 'dark')
     this._render.setAttribute(this.el.nativeElement, 'checked' , 'checked')
     this.themevalue = 'dark'
  }
  setLightTheme(){
     this._render.setAttribute(document.body, 'data-theme', 'light')
     this._render.removeAttribute(this.el.nativeElement, 'checked')
     this.themevalue = 'light'
  }

}
