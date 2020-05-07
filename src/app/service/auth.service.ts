import { ToastrService } from 'ngx-toastr';
import { IResponsePayload } from './../models/responsePayload';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject }from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

     readonly baseurl = "http://localhost:3000/";
     constructor(private _http : HttpClient, private _toastr : ToastrService) { }
     intitalLoad = new BehaviorSubject(true);

     userSignup(payload){
          return this._http.post(`${this.baseurl}users/signup`, payload , { observe : 'response'})
     }
     userLogin(payload){
          return this._http.post(`${this.baseurl}users/login`, payload, { observe : 'body' })
          .pipe(
               map( (response_payload : IResponsePayload) =>{
                    if(response_payload){
                         let token = response_payload.token
                         // let user : IuserFetched = {
                         //      username : response_payload.user.username,
                         //      email : response_payload.user.email,
                         //      _id : response_payload.user._id,
                         //      message : response_payload.message
                         // }
                         this.setLocalStorage(token)
                         console.log("login successfully ")
                    }
               }),
               catchError(this.errorEmit)
          );
     }
     public userLogout(){
          this.clearLocalStorage()
     }
     private setLocalStorage(token, user?){
          localStorage.setItem("token", token )
          // localStorage.setItem("user", JSON.stringify(user) )
     }
     private clearLocalStorage(){
          localStorage.clear()
     }
     private getTokenFromLocalStorage(){
          return !!localStorage.getItem("token")
     }
     public isLogedIn(): boolean{
          if(this.getTokenFromLocalStorage() ) return true
          else return false
     }

     private errorEmit(error : HttpErrorResponse){
          let errorText ;
          if(error.error instanceof ErrorEvent ){
               // client  side error accurred
               console.log("client side error accured : " + error.error.message)
               errorText = error.error.message;
          }else{
               // server side error accurred
               console.log("server side error accured  : " + error.error )
               errorText = error.error.message
               // console.log(error)
          }
          return throwError(errorText)
     }
}
