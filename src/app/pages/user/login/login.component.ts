import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { ApiCallsService } from 'src/app/service/api-calls.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth : AuthService, private _router : Router) { }
  user : IUser = {
       uname : "",
       upass : ""
  }
  serverError = {
     isErrorMessage : false ,
     errorMessage : ""
  }

  ngOnInit(): void {
  }
  loginData(){
     var payload = {
          username : this.user.uname,
          password : this.user.upass
     }
     this._auth.userLogin(payload).subscribe(res=>{
          this._router.navigate(['/lists'])
     },error=>{
          console.log(error)
     })
  }

}
