import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public contact_url = " http://localhost:3000/contacts/"

  constructor(private httpClient: HttpClient, private apiService: ApiService) { }
  // allcontact():Observable<any>{
  //   return this.apiService.get(this.contact_url);
  // }
  addContactDetail(contact_dto: any): Observable<any> {
    return this.httpClient.post(this.contact_url, contact_dto);
  }
  // singlecontact(id:any){
  //   return this.apiService.get(this.contact_url+id);
  // }
  // updatecontact(id:any, contact_dto:any):Observable<any>{
  //   return this.apiService.put(this.contact_url+id, contact_dto);
  // }
  // deletecontact(id:any):Observable<any>{
  //   return this.apiService.delete(this.contact_url+id);
  // }
}
