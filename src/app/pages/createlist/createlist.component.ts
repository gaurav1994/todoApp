import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiCallsService } from 'src/app/service/api-calls.service';
import { IList } from 'src/app/models/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createlist',
  templateUrl: './createlist.component.html',
  styleUrls: ['./createlist.component.scss']
})
export class CreatelistComponent implements OnInit, AfterViewInit {

  constructor(private _api : ApiCallsService , private _route : Router, private _toastr : ToastrService) { }

  @ViewChild('listInput') listInput : ElementRef ;
  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.listInput.nativeElement.focus()
  }
  addNewList(listInput){
    let list = { title : listInput.value };
    this._api.addNewList(list).subscribe( (result : IList)=>{
    this._route.navigate(['/lists', result._id])
   }, error =>{
     this._toastr.error("List value required", "Required")
   },()=>{
        this._toastr.success("List Added Successfully", "List Added")
   })
  }

}
