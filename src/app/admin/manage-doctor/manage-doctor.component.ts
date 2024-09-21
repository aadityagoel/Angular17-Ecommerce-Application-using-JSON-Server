import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from '../../core/Model/object-model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-manage-doctor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-doctor.component.html',
  styleUrl: './manage-doctor.component.css'
})
export class ManageDoctorComponent implements OnInit {
  all_doctor_data: any;
  single_doctor_data: any;
  addEditDoctorForm!: FormGroup;
  doctor_dto!: Doctor;
  doctor_reg_data: any;
  edit_doctor_id: any;
  upload_file_name!: string;
  upload_cv_file_name!: string;
  addEditDoctor: boolean = false; // For Form validation
  add_doctor: boolean = false;
  edit_doctor: boolean = false;
  popup_header!: string;


  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllDoctor();
    this.addEditDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      specialist: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      cv_pdf: ['', Validators.required],
      status: ['', Validators.required],
    })
  }
  getAllDoctor() {
    this.adminService.allDoctor().subscribe(data => {
      this.all_doctor_data = data;
    }, error => {
      console.log("My error", error)
    })
  }
  get rf() {
    return this.addEditDoctorForm.controls;
  }

  addDoctorsPopup() {
    this.edit_doctor = false;
    this.add_doctor = true;
    this.popup_header = "Add New Doctor";
    this.addEditDoctorForm.reset();
  }

  addDoctor() {
    this.addEditDoctor = true;
    if (this.addEditDoctorForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditDoctorForm.value));
      return;
    }
    this.doctor_reg_data = this.addEditDoctorForm.value;
    this.doctor_dto = {
      name: this.doctor_reg_data.name,
      specialist: this.doctor_reg_data.specialist,
      aboutYou: this.doctor_reg_data.aboutYou,
      uploadPhoto: this.doctor_reg_data.uploadPhoto,
      cv_pdf: this.doctor_reg_data.cv_pdf,
      status: this.doctor_reg_data.status
    }
    this.adminService.addDoctor(this.doctor_dto).subscribe(data => {
      this.addEditDoctorForm.reset();
      this.getAllDoctor();
      $('#addEditDoctorModal').modal('toggle');
    }, error => {
      console.log("my wrong ", error);
    })
  }
  editDoctorPopup(doctor_id: any) {
    this.edit_doctor_id = doctor_id;
    this.edit_doctor = true;
    this.add_doctor = false;
    this.popup_header = "Edit Doctor";
    this.adminService.singleuDoctor(doctor_id).subscribe(data => {
      this.single_doctor_data = data;
      this.upload_file_name = this.single_doctor_data.uploadPhoto;
      this.upload_cv_file_name = this.single_doctor_data.cv_pdf;
      this.addEditDoctorForm.setValue({
        name: this.single_doctor_data.name,
        specialist: this.single_doctor_data.specialist,
        aboutYou: this.single_doctor_data.aboutYou,
        uploadPhoto: this.single_doctor_data.uploadPhoto,
        cv_pdf: this.single_doctor_data.cv_pdf,
        status: this.single_doctor_data.status,
      });
    }, error => {
      console.log("My error", error)
    })
  }
  updateDoctor() {
    if (this.addEditDoctorForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditDoctorForm.value));
      return;
    }
    this.doctor_reg_data = this.addEditDoctorForm.value;
    this.doctor_dto = {
      name: this.doctor_reg_data.name,
      specialist: this.doctor_reg_data.specialist,
      aboutYou: this.doctor_reg_data.aboutYou,
      uploadPhoto: (this.doctor_reg_data.uploadPhoto == "" ? this.upload_file_name : this.doctor_reg_data.uploadPhoto),
      cv_pdf: (this.doctor_reg_data.cv_pdf == "" ? this.upload_cv_file_name : this.doctor_reg_data.cv_pdf),
      status: this.doctor_reg_data.status
    }
    this.adminService.editDoctor(this.edit_doctor_id, this.doctor_dto).subscribe(data => {
      this.addEditDoctorForm.reset()
      this.getAllDoctor();
      // $('#addEditDoctorModal').modal('toggle');
    }, error => {
      console.log("my wrong ", error);
    })
  }
  deleteDoctor(doctor_id: any) {
    this.adminService.deleteDoctor(doctor_id).subscribe(data => {
      this.getAllDoctor();
    }, error => {
      console.log("My error", error)
    })
  }
}
