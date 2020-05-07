import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiCallsService } from 'src/app/service/api-calls.service';
import { IList } from 'src/app/models/list';

@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.scss']
})
export class EditlistComponent implements OnInit, AfterViewInit {

  @ViewChild('listInput') listInput : ElementRef;
  constructor( private _api : ApiCallsService , private  _activatedroute : ActivatedRoute , private _route : Router, private _toastr : ToastrService) { }
  inputValue : string = "";
  listid : string = "";
  ngOnInit(): void {
    this._activatedroute.paramMap.subscribe((params : ParamMap)=>{
      this.listid = params.get('listid');
      this._api.getSingleList(this.listid).subscribe((response : IList)=>{
        this.inputValue = response.title
      })
    })
  }
  ngAfterViewInit(){
    this.listInput.nativeElement.focus()
  }
  editList(listInput){
       console.log(listInput.value)
    let listobj = {
      title : listInput.value
    }
    this._api.updateSingleList(this.listid, listobj).subscribe((response : IList) => {
    }, error => {
         this._toastr.error(error.error , "Required")
     }, () =>{ 
         this._route.navigate(['../' ], { relativeTo : this._activatedroute }) 
         this._toastr.success("List Updated Successfully", "Update")
     });
  }

}
