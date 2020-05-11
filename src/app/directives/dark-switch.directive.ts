import { AuthService } from 'src/app/service/auth.service';
import { Directive , HostListener, Renderer2, OnInit, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDarkSwitch]'
})
export class DarkSwitchDirective implements OnInit{

  constructor(private _render : Renderer2, private _auth : AuthService, private el : ElementRef) { }

  themevalue : string;
  ngOnInit(){
     this.themevalue = localStorage.getItem('theme');
     if(this.themevalue == 'light')
          this.setTheme(this.themevalue)
     else
          this.setTheme(this.themevalue)
  }
  @HostListener('change') onChange(){
     if(this.themevalue == 'light') this.setTheme('dark')
     else this.setTheme('light')
     let payload = {
          theme : localStorage.getItem('theme')
     }
     this._auth.userUpdate(payload).subscribe(value=>{ 
     })
  }
  setTheme(themeValue : string){
     if(themeValue == 'light'){
          this.setLightTheme('light')
     }else{
          this.setBlackTheme('dark')
     }
  }
  setBlackTheme(value){
     localStorage.setItem('theme', value)
     this._render.setAttribute(document.body, 'data-theme', value)
     this._render.setAttribute(this.el.nativeElement, 'checked' , 'checked')
     this.themevalue = 'dark' 
  }
  setLightTheme(value){
     localStorage.setItem('theme', value)
     this._render.setAttribute(document.body, 'data-theme', value)
     this._render.removeAttribute(this.el.nativeElement, 'checked')
     this.themevalue = 'light'
  }
}
