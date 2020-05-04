import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IList } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  readonly baseurl = "http://localhost:3000/";
  constructor( private _http : HttpClient) { }
  getlists() : Observable<IList[]>{
    return this._http.get<IList[]>(`${this.baseurl}lists`)
  }
  getSingleList(listid){
    return this._http.get(`${this.baseurl}lists/${listid}`)
  }
  addNewList(payload): Observable<IList>{
    return this._http.post<IList>(`${this.baseurl}lists`, payload);
  }
  updateSingleList(listid , payload){
    return this._http.patch(`${this.baseurl}lists/${listid}`, payload )
  }
  deleteSingleList(listid){
    return this._http.delete(`${this.baseurl}lists/${listid}`)
  }
  
  // get task by /lists/list_id/
  getTask(listid){
    return this._http.get(`${this.baseurl}tasks/${listid}`)
  }
  getSingleTask(listid,taskid){
    return this._http.get(`${this.baseurl}tasks/${listid}/${taskid}`)
  }
  addNewTask(payload){
    return this._http.post(`${this.baseurl}tasks/`,payload);
  }
  updateSingleTask(listid, taskid, payload){
    return this._http.patch(`${this.baseurl}tasks/${listid}/${taskid}`, payload)
  }
  deleteSingleTask(taskid){
    return this._http.delete(`${this.baseurl}tasks/${taskid}`);
  }
  // user signup calls

}
