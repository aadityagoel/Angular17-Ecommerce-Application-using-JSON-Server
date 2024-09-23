import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public doctor_url = Constant.JSON_API_URL + "doctors/"

  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  allDoctors(): Observable<any> {
    return this.apiService.get(this.doctor_url);
  }
  // getTopThreeDoctors(): Observable<any> {
  //   return this.httpClient.get<any[]>(this.doctor_url).pipe(map(contacts => contacts.slice(0, 3)) // Extract only the first 3 records
  //   );
  // }

  // addNewProduct(product_dto: any): Observable<any> {
  //   return this.apiService.post(this.product_url, product_dto);
  // }
  // singleProduct(id: any) {
  //   return this.apiService.get(this.product_url + id);
  // }
  // updateProduct(id: any, product_dto: any): Observable<any> {
  //   return this.apiService.put(this.product_url + id, product_dto);
  // }
  // deleteProduct(id: any): Observable<any> {
  //   return this.apiService.delete(this.product_url + id);
  // }
}