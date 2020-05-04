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

  constructor(private _api : ApiCallsService , private _route : Router) { }

  @ViewChild('listInput') listInput : ElementRef ;
  ngOnInit(): void {
    
  }
  ngAfterViewInit(){
    this.listInput.nativeElement.focus()
  }
  addNewList(listInput){
    let list = { title : listInput };
   this._api.addNewList(list).subscribe( (result : IList)=>{
    console.log(result);
    this._route.navigate(['/lists', result._id])
   }, error =>{
     console.log(error)
   })
  }

}
