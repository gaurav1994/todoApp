import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/models/user";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  constructor(
    private _auth : AuthService,
    private _router: Router,
    private _activatedroute: ActivatedRoute
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
    this._auth.userSignup(userPayload).subscribe(
      (response: IUser) => {	
        console.log(response)
      },
      (error) =>{ 
           console.log(error) 
          formSignupData.resetForm() },
      () =>
        this._router.navigate(["../login"], {
          relativeTo: this._activatedroute,
        })
    );
  }
}
