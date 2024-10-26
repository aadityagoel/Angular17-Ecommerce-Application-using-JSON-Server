import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../../core/service/api.service';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = `${Constant.JSON_API_URL}/api/users/`;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  // Get individual user data by user_id
  getUserData(user_id: any): Observable<any> {
    return this.apiService.get(`${this.userUrl}${user_id}`).pipe(
      catchError((error) => {
        console.error('Error fetching user data:', error);
        throw error; // Optionally handle or rethrow the error as needed
      })
    );
  }

  // Update user data by user_id
  updateUserData(user_id: any, user_dto: any): Observable<any> {
    return this.http.put(`${this.userUrl}${user_id}`, user_dto).pipe(
      catchError((error) => {
        console.error('Error updating user data:', error);
        throw error; // Optionally handle or rethrow the error as needed
      })
    );
  }
}
