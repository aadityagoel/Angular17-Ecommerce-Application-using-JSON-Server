import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { ContactService } from '../shared/services/contact.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {

  contactForm!: FormGroup;
  contact_data: any;
  contact_dto!: Contact


  constructor(private fb: FormBuilder, private router: Router, private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      ContactName: ['', Validators.required],
      ContactEmail: ['', Validators.required],
      ContactPhone: ['', Validators.required],
      ContactComment: ['', Validators.required],
    })
  }
  get rf() {
    return this.contactForm.controls;
  }
  submitContact() {
    if (this.contactForm.invalid) {
      return;
    }
    this.contact_data = this.contactForm.value;
    this.contact_dto = {
      id: 0,
      name: this.contact_data.ContactName,
      email: this.contact_data.ContactEmail,
      phone: this.contact_data.ContactPhone,
      comment: this.contact_data.ContactComment,
      status: true,
    }
    this.contactService.addContactDetail(this.contact_dto).subscribe(data => {
      console.log(data);
      this.contactForm.reset();
      alert("Thanks for your Response!!!");
    }, error => {
      console.log("my error", error)
    })
  }
}
