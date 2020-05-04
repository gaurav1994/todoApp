import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {

  constructor(private _auth : AuthService) { }

  intercept(req: HttpRequest<any>, next : HttpHandler){
     let request = this.cloneRequest(req)
     return next.handle(request);
  }
  cloneRequest(req : HttpRequest<any>){
     if( this._auth.isLogedIn() ){
          let clonereq = req.clone({
               headers : req.headers.set("Authorization", localStorage.getItem("token"))
          });
          return clonereq
     }else return req
  }
}
