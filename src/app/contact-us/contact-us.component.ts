import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../shared/services/contact.service';
import { Contact } from '../core/Model/object-model';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']  // Corrected 'styleUrl' to 'styleUrls'
})
export class ContactUsComponent implements OnInit {

  contactForm!: FormGroup;
  contact_data: any;
  contact_dto!: Contact;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      ContactName: ['', Validators.required],
      ContactEmail: ['', [Validators.required, Validators.email]],  // Added email validation
      ContactPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],  // Phone validation (10 digits)
      ContactComment: ['', Validators.required],
    });
  }

  get rf() {
    return this.contactForm.controls;
  }

  submitContact() {
    if (this.contactForm.invalid) {
      return;
    }

    this.contact_data = this.contactForm.value;

    // Mapping form data to the Contact DTO
    this.contact_dto = {
      id: 0,  // Assuming 0 or a default value for id if not provided
      name: this.contact_data.ContactName,
      email: this.contact_data.ContactEmail,
      phone: this.contact_data.ContactPhone,
      comment: this.contact_data.ContactComment,
      status: true,
    };

    // Call the service to submit the contact details
    this.contactService.addContactDetail(this.contact_dto).subscribe(
      (data) => {
        console.log(data);
        this.contactForm.reset();
        alert("Thanks for your Response!!!");
      },
      (error) => {
        console.log("Error submitting contact form", error);
        alert("There was an error submitting your contact request. Please try again later.");
      }
    );
  }
}
