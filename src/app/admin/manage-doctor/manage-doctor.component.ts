import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from '../../core/Model/object-model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Constant } from '../../shared/services/constant/constant';
declare var $: any;

@Component({
  selector: 'app-manage-doctor',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-doctor.component.html',
  styleUrls: ['./manage-doctor.component.css']
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
  selectedFilePhoto: File | null = null;
  selectedFileCV: File | null = null;
  server_base_url: any = Constant.JSON_API_URL;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getAllDoctor();
    this.addEditDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      specialist: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      cv_pdf: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  getAllDoctor() {
    this.adminService.allDoctor().subscribe(data => {
      this.all_doctor_data = data;
    }, error => {
      console.log("Error fetching doctors", error);
    });
  }

  get rf() {
    return this.addEditDoctorForm.value;
  }

  addDoctorsPopup() {
    this.edit_doctor = false;
    this.add_doctor = true;
    this.popup_header = "Add New Doctor";
    this.addEditDoctorForm.reset();
    this.selectedFilePhoto = null;
    this.selectedFileCV = null;
  }

  onFileChange(event: any, fileType: string) {

    if (fileType === 'photo') {
      this.selectedFilePhoto = event.target.files[0];
    } else if (fileType === 'cv') {
      this.selectedFileCV = event.target.files[0];
    }
  }

  addDoctor() {
    this.addEditDoctor = true;
    // if (this.addEditDoctorForm.invalid) {
    //   alert('Please fill all required fields.');
    //   console.log(this.addEditDoctorForm);
    //   return;
    // }

    const formData = new FormData();
    formData.append('name', this.rf.name);
    formData.append('specialist', this.rf.specialist);
    formData.append('aboutYou', this.rf.aboutYou);
    formData.append('status', this.rf.status);

    if (this.selectedFilePhoto) {
      formData.append('uploadPhoto', this.selectedFilePhoto);
    }
    if (this.selectedFileCV) {
      formData.append('cv_pdf', this.selectedFileCV);
    }

    this.adminService.addDoctor(formData).subscribe(data => {
      this.addEditDoctorForm.reset();
      this.getAllDoctor();
      $('#addEditDoctorModal').modal('hide');
    }, error => {
      console.log("Error adding doctor", error);
    });
  }

  editDoctorPopup(doctor_id: any) {

    this.edit_doctor_id = doctor_id;
    this.edit_doctor = true;
    this.add_doctor = false;
    this.popup_header = "Edit Doctor";
    this.adminService.singleDoctor(doctor_id).subscribe(data => {

      this.single_doctor_data = data;
      this.upload_file_name = this.single_doctor_data.uploadPhoto;
      this.upload_cv_file_name = this.single_doctor_data.cv_pdf;
      this.addEditDoctorForm.setValue({
        name: this.single_doctor_data.name,
        specialist: this.single_doctor_data.specialist,
        aboutYou: this.single_doctor_data.aboutYou,
        uploadPhoto: '',
        cv_pdf: '',
        status: this.single_doctor_data.status,
      });
    }, error => {
      console.log("Error fetching doctor details", error);
    });
  }

  updateDoctor() {

    // if (this.addEditDoctorForm.invalid) {
    //   alert('Please fill all required fields.');
    //   return;
    // }

    const formData = new FormData();
    formData.append('name', this.rf.name);
    formData.append('specialist', this.rf.specialist);
    formData.append('aboutYou', this.rf.aboutYou);
    formData.append('status', this.rf.status);

    if (this.selectedFilePhoto) {
      formData.append('uploadPhoto', this.selectedFilePhoto);
    } else {
      formData.append('uploadPhoto', this.upload_file_name);
    }

    if (this.selectedFileCV) {
      formData.append('cv_pdf', this.selectedFileCV);
    } else {
      formData.append('cv_pdf', this.upload_cv_file_name);
    }

    this.adminService.editDoctor(this.edit_doctor_id, formData).subscribe(data => {
      this.addEditDoctorForm.reset();
      this.getAllDoctor();
      $('#addEditDoctorModal').modal('hide');
      location.reload();
    }, error => {
      console.log("Error updating doctor", error);
    });
  }

  deleteDoctor(doctor_id: any) {
    this.adminService.deleteDoctor(doctor_id).subscribe(data => {
      this.getAllDoctor();
    }, error => {
      console.log("Error deleting doctor", error);
    });
  }
}
