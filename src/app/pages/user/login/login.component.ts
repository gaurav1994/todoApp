import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { ApiCallsService } from 'src/app/service/api-calls.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth : AuthService, private _router : Router, private _toastr : ToastrService) { }
  user : IUser = {
       uname : "",
       upass : ""
  }

  ngOnInit(): void {
  }
  loginData(loginData : NgForm){
     var payload = {
          username : this.user.uname,
          password : this.user.upass
     }
     this._auth.userLogin(payload).subscribe(res=>{
          this._router.navigate(['/lists'])
     },err=>{
          this._toastr.error(err, 'Unauthorised' )
          loginData.resetForm()
     },()=>{
          this._toastr.success("Login Successfully")
     })
  }

}
