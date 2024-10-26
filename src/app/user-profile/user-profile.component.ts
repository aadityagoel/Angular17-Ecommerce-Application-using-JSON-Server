import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],  // Import ReactiveFormsModule here
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  userProfile: boolean = false;
  user_id!: number;
  user_data: any;
  user_update_data: any;
  user_profile_pic: any;
  user_role: any;
  selectedFile: File | null = null;  // Handle the file upload

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user_id = Number(sessionStorage.getItem('user_session_id'));
    debugger
    if(this.user_id == 0){
      this.router.navigate(['/sign-in']);
    }
    
    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      addLine1: ['', Validators.required],
      addLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: [''],
    });

    this.editUserData(this.user_id);
  }

  editUserData(user_id: any) {
    this.userService.getUserData(user_id).subscribe(
      (data) => {
        this.user_data = data;
        this.user_profile_pic = this.user_data.uploadPhoto;
        this.user_role = this.user_data.role;

        // Set form values
        this.userProfileForm.patchValue({
          name: this.user_data.name,
          mobNumber: this.user_data.mobNumber,
          age: this.user_data.age,
          dob: this.user_data.dob,
          email: this.user_data.email,
          password: this.user_data.password,
          language: this.user_data.language,
          gender: this.user_data.gender,
          addLine1: this.user_data.address?.addLine1 || '',
          addLine2: this.user_data.address?.addLine2 || '',
          city: this.user_data.address?.city || '',
          state: this.user_data.address?.state || '',
          zipCode: this.user_data.address?.zipCode || '',
          aboutYou: this.user_data.aboutYou,
        });
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  // Handle file change event for file input
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  updateProfile() {
    if (this.userProfileForm.invalid) {
      return;
    }

    const updatedData = this.userProfileForm.value;
    const formData = new FormData();  // Use FormData to handle file uploads

    formData.append('name', updatedData.name);
    formData.append('mobNumber', updatedData.mobNumber);
    formData.append('age', updatedData.age);
    formData.append('dob', updatedData.dob);
    formData.append('email', updatedData.email);
    formData.append('password', updatedData.password);
    formData.append('addLine1', updatedData.addLine1);
    formData.append('addLine2', updatedData.addLine2);
    formData.append('city', updatedData.city);
    formData.append('state', updatedData.state);
    formData.append('zipCode', updatedData.zipCode);
    formData.append('language', updatedData.language);
    formData.append('gender', updatedData.gender);
    formData.append('aboutYou', updatedData.aboutYou);
    
    if (this.selectedFile) {
      formData.append('uploadPhoto', this.selectedFile);  // Append file only if a new file is selected
    }

    this.userService.updateUserData(this.user_id, formData).subscribe(
      (data) => {
        alert('Profile updated successfully!');
        if (this.user_role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }
}
