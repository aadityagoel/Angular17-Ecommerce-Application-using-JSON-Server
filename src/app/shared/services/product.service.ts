import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product_url = Constant.JSON_API_URL + "/api/products"

  constructor(private httpClient: HttpClient, private apiService: ApiService) { }
  allProduct(): Observable<any> {
    return this.apiService.get(this.product_url);
  }
  addNewProduct(product_dto: any): Observable<any> {
    return this.apiService.post(this.product_url, product_dto);
  }
  singleProduct(id: any) {
    return this.apiService.get(this.product_url + id);
  }
  updateProduct(id: any, product_dto: any): Observable<any> {
    return this.apiService.put(this.product_url + id, product_dto);
  }
  deleteProduct(id: any): Observable<any> {
    return this.apiService.delete(this.product_url + id);
  }
}
