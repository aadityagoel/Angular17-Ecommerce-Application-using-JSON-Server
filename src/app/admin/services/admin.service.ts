import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../../shared/services/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public user_url = Constant.JSON_API_URL + "/user/";
  public product_url = Constant.JSON_API_URL + "/products/";
  public doctor_url = Constant.JSON_API_URL + "/api/doctors";
  public all_user = Constant.JSON_API_URL + "/user";

  constructor(private httpClient: HttpClient, private apiService:ApiService) { }

  userDashboardData(){
    return this.apiService.get(this.user_url);
  }
  productDashboardData(){
    return this.apiService.get(this.product_url);
  }
  DoctorDashboardData(){
    return this.apiService.get(this.doctor_url);
  }


  allUser():Observable<any>{
    return this.apiService.get(this.all_user)
  }
  addUser(user_dto:any){
    return this.apiService.post(this.user_url, user_dto);
  }
  //get data of individual user
  singleuUser(user_id:any){
    return this.apiService.get(this.user_url+user_id)
  }
  //update data of individual user
  editUser(user_id:any, user_dto:any):Observable<any>{
    return this.apiService.put(this.user_url+user_id, user_dto);
  }
  //delete user
  deleteUser(user_id:any){
    return this.apiService.delete(this.user_url+user_id)
  }

  // Get all doctors
  allDoctor(): Observable<any> {
    return this.httpClient.get(this.doctor_url);
  }

  // Add a new doctor
  addDoctor(doctor_dto: any): Observable<any> {
    return this.httpClient.post(this.doctor_url, doctor_dto);
  }

  // Get data of a single doctor
  singleDoctor(doctor_id: any): Observable<any> {
    return this.httpClient.get(this.doctor_url + "/" + doctor_id);
  }

  // Update data of an individual doctor
  editDoctor(doctor_id: any, doctor_dto: any): Observable<any> {
    return this.httpClient.put(this.doctor_url + "/" + doctor_id, doctor_dto);
  }

  // Delete a doctor
  deleteDoctor(doctor_id: any): Observable<any> {
    return this.httpClient.delete(this.doctor_url + "/" + doctor_id);
  }
}
