import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsComponent } from './pages/lists/lists.component';
import { CreatelistComponent } from './pages/createlist/createlist.component';
import { ApiCallsService } from './service/api-calls.service';
import { CreatetaskComponent } from './pages/createtask/createtask.component';
import { EditlistComponent } from './pages/editlist/editlist.component';
import { EdittaskComponent } from './pages/edittask/edittask.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { LoginComponent } from './pages/user/login/login.component';
import { AuthService } from './service/auth.service';
import { InterceptService } from './service/intercept.service';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    CreatelistComponent,
    CreatetaskComponent,
    EditlistComponent,
    EdittaskComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiCallsService, AuthService, { provide : HTTP_INTERCEPTORS , useClass : InterceptService , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
