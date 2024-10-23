import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';
import { HttpClientModule } from '@angular/common/http';
import { Constant } from '../../shared/services/constant/constant';
declare var $: any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']  // Corrected styleUrls
})
export class UserCrudComponent implements OnInit {
  all_user_data: any;
  single_user_data: any;
  addEditUserForm!: FormGroup;
  user_dto!: User;
  user_reg_data: any;
  edit_user_id: any;
  upload_file_name!: string;
  addEditUser: boolean = false; // For Form validation
  add_user: boolean = false;
  edit_user: boolean = false;
  popup_header!: string;
  selectedFilePhoto: File | null = null;
  server_base_url: any = Constant.JSON_API_URL;

  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Added phone number validation
      age: ['', [Validators.required, Validators.min(1)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Added email validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Added password validation
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: [false, Validators.requiredTrue], // User must agree to terms and conditions
      role: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFilePhoto = event.target.files[0];
    if (file) {
      this.addEditUserForm.patchValue({
        uploadPhoto: file
      });
      this.upload_file_name = file.name;  // To show the file name in the modal
    }
  }

  getAllUser() {
    this.adminService.allUser().subscribe(
      data => { this.all_user_data = data; },
      error => { console.log('My error', error); }
    );
  }

  get rf() {
    return this.addEditUserForm.controls;
  }

  addUserPopup() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = 'Add New User';
    this.addEditUserForm.reset();
    this.selectedFilePhoto = null;
  }

  addUser() {
    this.addEditUser = true;
    // if (this.addEditUserForm.invalid) {
    //   return; // Stop if the form is invalid
    // }

    const formData = new FormData();

    // Append form fields to formData
    Object.keys(this.addEditUserForm.controls).forEach(key => {
      formData.append(key, this.addEditUserForm.get(key)?.value);
    });


    this.adminService.addUser(formData).subscribe(
      response => {
        console.log('User added successfully:', response);
        this.addEditUserForm.reset();
      },
      error => {
        console.error('Error adding user:', error);
      }
    );
  }

  editUserPopup(user_id: any) {
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = 'Edit User';

    this.adminService.singleUser(user_id).subscribe(
      data => {
        this.single_user_data = data;
        this.upload_file_name = this.single_user_data.uploadPhoto;

        this.addEditUserForm.setValue({
          name: this.single_user_data.name,
          mobNumber: this.single_user_data.mobNumber,
          age: this.single_user_data.age,
          dob: this.single_user_data.dob,
          email: this.single_user_data.email,
          password: this.single_user_data.password,
          language: this.single_user_data.language,
          gender: this.single_user_data.gender,
          addLine1: this.single_user_data.address.addLine1,
          addLine2: this.single_user_data.address.addLine2,
          city: this.single_user_data.address.city,
          state: this.single_user_data.address.state,
          zipCode: this.single_user_data.address.zipCode,
          aboutYou: this.single_user_data.aboutYou,
          uploadPhoto: '',
          agreetc: this.single_user_data.agreetc ? true : false,
          role: this.single_user_data.role,
        });
      },
      error => { console.log('My error', error); }
    );
  }

  updateUser() {
    // if (this.addEditUserForm.invalid) {
    //   return; // Stop if form is invalid
    // }

    const formData = new FormData();  // Create FormData object

    // Append all form data fields
    formData.append('name', this.addEditUserForm.get('name')?.value);
    formData.append('mobNumber', this.addEditUserForm.get('mobNumber')?.value);
    formData.append('email', this.addEditUserForm.get('email')?.value);
    formData.append('age', this.addEditUserForm.get('age')?.value);
    formData.append('dob', this.addEditUserForm.get('dob')?.value);
    formData.append('password', this.addEditUserForm.get('password')?.value);
    formData.append('aboutYou', this.addEditUserForm.get('aboutYou')?.value);
    formData.append('role', this.addEditUserForm.get('role')?.value);
    formData.append('agreetc', this.addEditUserForm.get('agreetc')?.value);
    formData.append('gender', this.addEditUserForm.get('gender')?.value);
    formData.append('language', this.addEditUserForm.get('language')?.value);  // Assuming it's a string or serialize if array

    // Append address fields
    formData.append('addLine1', this.addEditUserForm.get('addLine1')?.value);
    formData.append('addLine2', this.addEditUserForm.get('addLine2')?.value);
    formData.append('city', this.addEditUserForm.get('city')?.value);
    formData.append('state', this.addEditUserForm.get('state')?.value);
    formData.append('zipCode', this.addEditUserForm.get('zipCode')?.value);

    // Append file upload only if a new file is selected
    if (this.addEditUserForm.get('uploadPhoto')?.value && this.addEditUserForm.get('uploadPhoto')?.value !== '') {
      formData.append('uploadPhoto', this.addEditUserForm.get('uploadPhoto')?.value);
    } else {
      // Use the existing file name if no new file was uploaded
      formData.append('uploadPhoto', this.upload_file_name);
    }
    // Send form data to the backend
    this.adminService.editUser(this.edit_user_id, formData).subscribe(
      (response) => {
        this.addEditUserForm.reset();
        this.getAllUser();  // Refresh user list after update
        // $('#addEditUserModal').modal('toggle'); // Toggle modal if necessary
      },
      (error) => {
        console.log('Error updating user:', error);
      }
    );
  }

  deleteUser(user_id: any) {
    this.adminService.deleteUser(user_id).subscribe(
      data => { this.getAllUser(); },
      error => { console.log('My error', error); }
    );
  }
}
