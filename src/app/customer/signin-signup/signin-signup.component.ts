import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css']
})
export class SigninSignupComponent implements OnInit {
  regForm: boolean = false;
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  signUpsubmitted = false;
  user_data: any;
  user_dto!: User;
  user_reg_data: any;

  signInFormValue = { userEmail: '', userPassword: '' };
  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginSignupService
  ) { }

  ngOnInit(): void {
    this.regForm = this.router.url === '/sign-up';

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: [null, Validators.required],  // File input
      role: ['user']  // Default role set to 'user'
    });

    this.signInForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required]
    });
  }

  get sf() {
    return this.signUpForm.controls;
  }

  get lf() {
    return this.signInForm.controls;
  }

  // Event handler to capture file input
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmitSignUp() {
    this.signUpsubmitted = true;
    if (this.signUpForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.signUpForm.controls).forEach((key) => {
      if (key === 'uploadPhoto' && this.selectedFile) {
        formData.append(key, this.selectedFile);
      } else {
        formData.append(key, this.signUpForm.controls[key].value);
      }
    });

    // formData.append('role', 'user');  // Ensure the role is set

    this.loginService.userRegister(formData).subscribe(
      () => {
        alert('User registered successfully ☺');
        this.router.navigateByUrl('/sign-in');
      },
      (error) => {
        console.error('Registration Error:', error);
        alert('An error occurred during registration. Please try again.');
      }
    );
  }

  onSubmitSignIn() {
    const { userEmail, userPassword } = this.signInFormValue;
    this.loginService.authLogin(userEmail, userPassword).subscribe(
      (data) => {
        this.user_data = data;
        if (this.user_data && this.user_data.role) {
          sessionStorage.setItem('user_session_id', this.user_data.id);
          sessionStorage.setItem('role', this.user_data.role);
          this.router.navigateByUrl(this.user_data.role === 'doctor' ? '/doctor-dashboard' : '/user-dashboard');
        } else {
          alert('Invalid login details');
        }
      },
      (error) => {
        console.error('Login Error:', error);
        alert('An error occurred during login. Please try again.');
      }
    );
  }
}
