import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  private baseUrl = `${Constant.JSON_API_URL}/api/users`;

  constructor(private http: HttpClient) { }

  // User authentication using POST for security
  authLogin(userEmail: string, userPassword: string): Observable<any> {
    const payload = { email: userEmail, password: userPassword };
    console.log(payload)
    return this.http.post<any>(`${this.baseUrl}/auth`, payload).pipe(
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError('Login failed; please try again.');
      })
    );
  }

  // User registration
  userRegister(userDto: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, userDto).pipe(
      catchError((error) => {
        console.error('Registration Error:', error);
        return throwError('Registration failed; please try again.');
      })
    );
  }

  // Admin authentication with role validation
  adminLogin(userEmail: string, userPassword: string): Observable<any> {
    const payload = { email: userEmail, password: userPassword, role: 'admin' };
    return this.http.post<any>(`${this.baseUrl}/auth/admin`, payload).pipe(
      catchError((error) => {
        console.error('Admin Login Error:', error);
        return throwError('Admin login failed; please try again.');
      })
    );
  }
}
