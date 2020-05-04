import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './pages/lists/lists.component';
import { CreatelistComponent } from './pages/createlist/createlist.component';
import { CreatetaskComponent } from './pages/createtask/createtask.component';
import { EditlistComponent } from './pages/editlist/editlist.component';
import { EdittaskComponent } from './pages/edittask/edittask.component';
import { LoginComponent } from './pages/user/login/login.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path : "", redirectTo : "/login", pathMatch : "full" },
  { path : "lists", canActivate: [AuthGuard] , component : ListsComponent},
  { path : "lists/create-list" , canActivate : [AuthGuard] , component : CreatelistComponent},
  { path : "lists/:listid" , canActivate: [AuthGuard] , component : ListsComponent},
  { path : "lists/:listid/create-list" , canActivate : [AuthGuard] , component : CreatelistComponent},
  { path : "lists/:listid/edit-list", canActivate : [AuthGuard] , component : EditlistComponent},
  { path : 'lists/:listid/new-task', canActivate : [AuthGuard] , component : CreatetaskComponent },
  { path : "lists/:listid/edit-task/:taskid" , canActivate : [AuthGuard] , component : EdittaskComponent },
  { path : "login" , component : LoginComponent},
  { path : "signup" , component : SignupComponent},
  { path : "**" , redirectTo : "/login" , pathMatch : "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
