import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApiCallsService } from 'src/app/service/api-calls.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.scss']
})
export class EdittaskComponent implements OnInit , AfterViewInit{

  @ViewChild('taskInput') taskInput : ElementRef ;
  constructor(private _api : ApiCallsService, private _activatedroute : ActivatedRoute, private _router : Router, private _toastr : ToastrService ) { }

  inputValue : string = "";
  listid : string ;
  taskid : string ;
  ngOnInit(): void {
    this._activatedroute.paramMap.subscribe((params : ParamMap)=>{
      this.listid = params.get('listid')
      this.taskid = params.get('taskid')
      this._api.getSingleTask(this.listid, this.taskid).subscribe((response : ITask)=>{
        this.inputValue = response.title;
      })
    })
  }
  ngAfterViewInit(){
    this.taskInput.nativeElement.focus()
  }
  editTask(value){
       if(value.title == ""){
            return this._toastr.error("Task value is required", "Required")
       }
    this._api.updateSingleTask(this.listid, this.taskid, value).subscribe( (response : ITask)=>{
      console.log(response)
      this._router.navigate(['../../'], { relativeTo : this._activatedroute})
    }, error=> console.log(error), ()=>{
         this._toastr.success("Task Updated Successfully" , "Updated")
    } )
  }

}
