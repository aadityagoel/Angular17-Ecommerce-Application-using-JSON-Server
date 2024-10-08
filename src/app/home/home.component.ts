import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DoctorsComponent } from "../doctors/doctors.component";
import { FormBuilder } from '@angular/forms';
import { DoctorService } from '../shared/services/doctor.service';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from "../contact-us/contact-us.component";
import { Constant } from '../shared/services/constant/constant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, DoctorsComponent, ContactUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  all_doctor_data: any;
  topThreeDoctors: any;
  mobile: string = '+91 73037 23841';
  server_base_url: any = Constant.JSON_API_URL_without_Slash;

  constructor(private fb: FormBuilder, private router: Router, private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.getTopThreeDoctors()
  }

  getTopThreeDoctors() {
    this.doctorService.allDoctors().subscribe(data => {
      this.all_doctor_data = data;
      this.topThreeDoctors = this.all_doctor_data.slice(0, 3);
      // console.log("My All Doctors", this.all_doctor_data)
    }, error => {
      console.log("Somthing went wrong ", error)
    })
  }

}
