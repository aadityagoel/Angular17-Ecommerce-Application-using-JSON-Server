import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url = Constant.JSON_API_URL;
  public reg_url = Constant.JSON_API_URL;

  constructor(private http: HttpClient, private apiService: ApiService) { }
  authLogin(user_name: any, password: any): Observable<any> {
    return this.apiService.get(this.login_url + 'user?email=' + user_name + '&password=' + password);
  }

  userRegister(user_dto: any): Observable<any> {
    return this.apiService.post(this.reg_url + 'user', user_dto)
  }

  adminLogin(user_name: any, password: any): Observable<any> {
    return this.apiService.get(this.login_url + 'user?email=' + user_name + '&password=' + password + '&role=admin');
  }
}
