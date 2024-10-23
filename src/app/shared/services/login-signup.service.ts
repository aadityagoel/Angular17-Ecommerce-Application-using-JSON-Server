import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url = Constant.JSON_API_URL + '/api';
  public reg_url = Constant.JSON_API_URL + '/api';

  constructor(private http: HttpClient, private apiService: ApiService) { }
  authLogin(user_name: any, password: any): Observable<any> {
    return this.apiService.get(this.login_url + '/users?email=' + user_name + '&password=' + password);
  }

  userRegister(user_dto: any): Observable<any> {
    return this.http.post(this.reg_url + '/users', user_dto)
  }

  adminLogin(user_name: any, password: any): Observable<any> {
    return this.apiService.get(this.login_url + '/users?email=' + user_name + '&password=' + password + '&role=admin');
  }
}
