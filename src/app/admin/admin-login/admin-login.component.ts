import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'] // Corrected styleUrls
})
export class AdminLoginComponent implements OnInit {
  signInFormValue: { userEmail: string, userPassword: string } = { userEmail: '', userPassword: '' };
  user_data: any;
  showPassword: boolean = false;
  constructor(private router: Router, private loginService: LoginSignupService) { }

  ngOnInit(): void { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  onSubmitSignIn(): void {
    if (!this.signInFormValue.userEmail || !this.signInFormValue.userPassword) {
      alert('Please fill out both email and password.');
      return;
    }

    this.loginService.adminLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(
      (data: any) => {
        this.user_data = data;

        if (this.user_data && this.user_data.role === 'admin') {
          // Store session data
          sessionStorage.setItem('user_session_id', this.user_data.id);
          sessionStorage.setItem('role', this.user_data.role);
    
          // Redirect to admin dashboard
          this.router.navigateByUrl('/admin-dashboard');
        } else {
          alert('Invalid credentials or response');
        }
        console.log('User Data:', this.user_data);
      },
      (error) => {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
      }
    );
  }
}
