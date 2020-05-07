import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/models/user";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  constructor(
    private _auth : AuthService,
    private _router: Router,
    private _activatedroute: ActivatedRoute,
    private _toastr : ToastrService
  ) {}
  user: IUser = {
    uname: "",
    uemail: "",
    upass: "",
  };
  ngOnInit(): void {}
  signupData(formSignupData: NgForm) {
    let userPayload = {
      username: this.user.uname,
      email: this.user.uemail,
      password: this.user.upass,
    };
    console.log(userPayload)
    this._auth.userSignup(userPayload).subscribe((response: HttpResponse<any>) => {	
        console.log(response)
          this._toastr.success(response.body, response.statusText)
      },
      (error : HttpErrorResponse) =>{ 
          this._toastr.error(error.error, error.statusText)
          formSignupData.resetForm() 
     },() => {
        this._router.navigate(["../login"], { relativeTo: this._activatedroute })
      }
    );
  }
}
