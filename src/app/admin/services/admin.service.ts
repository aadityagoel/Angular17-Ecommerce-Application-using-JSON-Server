import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constant } from '../../shared/services/constant/constant';
import { Contact, User, Doctor } from '../../core/Model/object-model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private user_url = `${Constant.JSON_API_URL}/api/users`;
  private product_url = `${Constant.JSON_API_URL}/api/products`;
  private doctor_url = `${Constant.JSON_API_URL}/api/doctors`;
  private contact_url = `${Constant.JSON_API_URL}/api/contacts`;

  constructor(private httpClient: HttpClient) { }

  //#region Dashboard
  // Fetch data for user dashboard
  userDashboardData(): Observable<any> {
    return this.httpClient.get(this.user_url);
  }

  // Fetch data for product dashboard
  productDashboardData(): Observable<any> {
    return this.httpClient.get(this.product_url);
  }

  // Fetch data for doctor dashboard
  DoctorDashboardData(): Observable<any> {
    return this.httpClient.get(this.doctor_url);
  }

  // Fetch data for contact dashboard
  contactDashboardData(): Observable<any> {
    return this.httpClient.get(this.contact_url);
  }
  //#endregion

  //#region User CRUD
  // Get all users
  allUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.user_url);
  }

  // Add a new user
  addUser(user_dto: any): Observable<any>  {
    return this.httpClient.post(this.user_url, user_dto);
  }

  // Get a single user by ID
  singleUser(user_id: any): Observable<User> {
    return this.httpClient.get<User>(`${this.user_url}/${user_id}`);
  }

  // Update an existing user
  editUser(user_id: any, user_dto: any): Observable<any> {
    return this.httpClient.put(`${this.user_url}/${user_id}`, user_dto);
  }

  // Delete a user by ID
  deleteUser(user_id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.user_url}/${user_id}`);
  }
  //#endregion

  //#region Doctor CRUD
  // Get all doctors
  allDoctor(): Observable<any> {
    return this.httpClient.get(this.doctor_url);
  }

  // Add a new doctor
  addDoctor(doctor_dto: any): Observable<any> {
    return this.httpClient.post(this.doctor_url, doctor_dto);
  }

  // Get a single doctor by ID
  singleDoctor(doctor_id: any): Observable<any> {
    return this.httpClient.get(`${this.doctor_url}/${doctor_id}`);
  }

  // Update an existing doctor
  editDoctor(doctor_id: any, doctor_dto: any): Observable<any> {
    return this.httpClient.put(`${this.doctor_url}/${doctor_id}`, doctor_dto);
  }

  // Delete a doctor by ID
  deleteDoctor(doctor_id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.doctor_url}/${doctor_id}`);
  }
  //#endregion

  //#region Contact CRUD
  // Get all contacts
  allContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.contact_url);
  }

  // Get a single contact by ID
  getContact(id: any): Observable<Contact> {
    return this.httpClient.get<Contact>(`${this.contact_url}/${id}`);
  }

  // Add a new contact
  addContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.contact_url, contact);
  }

  // Update an existing contact
  updateContact(id: any, contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(`${this.contact_url}/${id}`, contact);
  }

  // Delete a contact by ID
  deleteContact(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.contact_url}/${id}`);
  }
  //#endregion
}
