import { IResponsePayload } from './../models/responsePayload';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, BehaviorSubject }from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IuserFetched } from '../models/userFetched';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

     readonly baseurl = "http://localhost:3000/";
     constructor(private _http : HttpClient) { }
     intitalLoad = new BehaviorSubject(true);

     userSignup(payload){
          return this._http.post(`${this.baseurl}users/signup`, payload)
     }
     userLogin(payload){
          return this._http.post(`${this.baseurl}users/login`, payload, { observe : 'body' })
          .pipe(
               map( (response_payload : IResponsePayload) =>{
                    if(response_payload){
                         console.log(response_payload)
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
          if(error instanceof HttpErrorResponse ){
               console.log("server side error accured : ")
               // console.log(error)
          }else{
               console.log("client side error accured  : " )
               // console.log(error)
          }
          let errorText = error.error.message
          return throwError(errorText)
     }
}