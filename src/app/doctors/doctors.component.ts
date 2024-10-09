import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../shared/services/doctor.service';
import { Constant } from '../shared/services/constant/constant';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']   // Corrected 'styleUrl' to 'styleUrls'
})
export class DoctorsComponent implements OnInit {
  all_doctor_data: any;   // Holds the data of all doctors
  server_base_url: any = Constant.JSON_API_URL;
  constructor(private router: Router, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getAllDoctors();  // Fetch the doctor data on component initialization
  }

  getAllDoctors() {
    this.doctorService.allDoctors().subscribe(
      (data) => {
        this.all_doctor_data = data;
        console.log("My All Doctors", this.all_doctor_data);  // Log the data
      },
      (error) => {
        console.log("Something went wrong", error);  // Log any errors
      }
    );
  }
}
