import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../core/Model/object-model';
import { DoctorService } from '../shared/services/doctor.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  all_doctor_data: any;

  constructor(private fb: FormBuilder, private router: Router, private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.getAllDoctors()
  }

  getAllDoctors() {
    this.doctorService.allDoctors().subscribe(data => {
      this.all_doctor_data = data;
      console.log("My All Doctors", this.all_doctor_data)
    }, error => {
      console.log("Somthing went wrong ", error)
    })
  }
}
