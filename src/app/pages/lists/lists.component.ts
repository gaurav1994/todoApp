import { ToastrService } from 'ngx-toastr';
import { IList } from "./../../models/list";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ApiCallsService } from "src/app/service/api-calls.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ITask } from "src/app/models/task";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"],
})
export class ListsComponent implements OnInit, AfterViewInit {
  constructor(
    private _api: ApiCallsService,
    private _activatedroute: ActivatedRoute,
    private _route: Router,
    private _auth: AuthService,
    private _toastr : ToastrService
  ) {}
  lists: IList[];
  tasks: ITask[];
  selected_listid: string = "xyz";
  initLoad: boolean;
  ngOnInit(): void {
    this._api.getlists().subscribe((result: IList[]) => {
      this.lists = result;
      if (this.initLoad && this.lists.length > 0) {
        this._route.navigate(["/lists", this.lists[0]._id]);
        this._auth.intitalLoad.next(false);
      }
    });
    this._activatedroute.paramMap.subscribe((params: ParamMap) => {
      this.selected_listid = params.get("listid");
      this._api.getTask(this.selected_listid).subscribe((tasks: ITask[]) => {
        this.tasks = tasks;
      });
    });
  }
  ngAfterViewInit(){
     
  }
  deleteSingleList() {
    this._api.deleteSingleList(this.selected_listid).subscribe((response) => {
        
      },
      (error) => {
        console.log(error);
        this._toastr.error(error, "Error")
      },()=>{
        this._route.navigate(["/lists"]);
        this._toastr.warning("List Removed Successfully", "Status Code 200")
      }
    );
  }
  deleteSingleTask(taskid) {
    this._api.deleteSingleTask(taskid).subscribe((response) => {
        this.tasks = this.tasks.filter(
          (singletask) => singletask._id != taskid
        );
      },
      (error) => console.log(error),
      ()=>{
          this._toastr.warning("Task Deleted Successfully" , "Task Deleted")
      }
    );
  }
  taskCompleteOps(task: ITask) {
    task.complete = !task.complete;
    let completeObj = {
      complete: task.complete,
    };
    this._api
      .updateSingleTask(this.selected_listid, task._id, completeObj)
      .subscribe((response: ITask) => {});
  }
  logout() {
    this._auth.userLogout();
    this._route.navigate(["/login"]);
    this._auth.intitalLoad.next(true);
  }
}
