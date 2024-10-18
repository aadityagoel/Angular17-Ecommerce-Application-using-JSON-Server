import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contact_url = Constant.JSON_API_URL + "/api/contacts";

  constructor(private httpClient: HttpClient) { }

  // Add new contact
  addContactDetail(contact_dto: any): Observable<any> {
    return this.httpClient.post(this.contact_url, contact_dto)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all contacts
  allContacts(): Observable<any> {
    return this.httpClient.get(this.contact_url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a single contact by ID
  singleContact(id: any): Observable<any> {
    return this.httpClient.get(`${this.contact_url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a contact by ID
  updateContact(id: any, contact_dto: any): Observable<any> {
    return this.httpClient.put(`${this.contact_url}/${id}`, contact_dto)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a contact by ID
  deleteContact(id: any): Observable<any> {
    return this.httpClient.delete(`${this.contact_url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error("Error in ContactService:", error);
    throw error;
  }
}
