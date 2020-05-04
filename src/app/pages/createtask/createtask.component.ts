import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiCallsService } from 'src/app/service/api-calls.service';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss']
})
export class CreatetaskComponent implements OnInit, AfterViewInit {

  @ViewChild('taskInput') taskinput : ElementRef;
  constructor(private _api : ApiCallsService, private _activatedroute : ActivatedRoute, private _route : Router) { }
  listid : string = "";
  ngOnInit(): void {
    this._activatedroute.paramMap.subscribe((params : ParamMap)=>{
      this.listid = params.get('listid');
    })
  }
  ngAfterViewInit(){
    this.taskinput.nativeElement.focus()
  }
  addNewTask(taskInput){
    let task = { title : taskInput, listid : this.listid }
    this._api.addNewTask(task).subscribe((response : ITask)=>{
      this._route.navigate(['../'], { relativeTo : this._activatedroute })
    }, error=> console.log(error))
  }   
}
