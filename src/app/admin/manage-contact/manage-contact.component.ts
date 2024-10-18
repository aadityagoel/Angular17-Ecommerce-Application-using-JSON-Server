import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ContactService } from '../services/contact.service';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-manage-contact',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.css']
})
export class ManageContactComponent implements OnInit {
  all_contact_data: any[] = [];
  addEditContactForm!: FormGroup;
  popup_header!: string;
  edit_contact_id: any;
  add_contact: boolean = false;
  edit_contact: boolean = false;

  constructor(private formBuilder: FormBuilder, private contactService: AdminService) { }

  ngOnInit(): void {
    this.getAllContacts();

    this.addEditContactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      comment: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  getAllContacts() {
    this.contactService.allContacts().subscribe(data => {
      this.all_contact_data = data;
    }, error => {
      console.error('Error fetching contacts:', error);
    });
  }

  addContactPopup() {
    this.edit_contact = false;
    this.add_contact = true;
    this.popup_header = 'Add New Contact';
    this.addEditContactForm.reset();
  }

  editContactPopup(contact_id: any) {
    this.edit_contact_id = contact_id;
    this.edit_contact = true;
    this.add_contact = false;
    this.popup_header = 'Edit Contact';

    this.contactService.getContact(contact_id).subscribe(data => {
      this.addEditContactForm.patchValue(data);
    }, error => {
      console.error('Error fetching contact details:', error);
    });
  }

  addContact() {
    if (this.addEditContactForm.invalid) {
      return;
    }

    const contactData = this.addEditContactForm.value;
    this.contactService.addContact(contactData).subscribe(data => {
      this.getAllContacts();
      this.addEditContactForm.reset();
    }, error => {
      console.error('Error adding contact:', error);
    });
  }

  updateContact() {
    if (this.addEditContactForm.invalid) {
      return;
    }

    const contactData = this.addEditContactForm.value;
    this.contactService.updateContact(this.edit_contact_id, contactData).subscribe(data => {
      this.getAllContacts();
      this.addEditContactForm.reset();
    }, error => {
      console.error('Error updating contact:', error);
    });
  }

  deleteContact(contact_id: any) {
    this.contactService.deleteContact(contact_id).subscribe(data => {
      this.getAllContacts();
    }, error => {
      console.error('Error deleting contact:', error);
    });
  }
}
