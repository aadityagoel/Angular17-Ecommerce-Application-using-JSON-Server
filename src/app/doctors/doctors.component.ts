import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../core/Model/object-model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit{
  all_doctor_data:any
  // addEditProductDForm!:FormGroup;
  // addEditProduct:boolean = false;
  // popup_header!:string;
  // add_prouct!:boolean;
  // edit_prouct!:boolean;
  // prouct_data:any;
  // single_product_data:any;
  // product_dto!:Product
  // edit_product_id:any;


  constructor(private fb:FormBuilder, private router:Router, private productService:ProductService){

  }

  ngOnInit(): void {
    // this.addEditProductDForm = this.fb.group({
    //   name:['',Validators.required],
    //   uploadPhoto:['',Validators.required],
    //   productDesc:['',Validators.required],
    //   mrp:['',Validators.required],
    //   dp:['',Validators.required],
    //   status:['',Validators.required],
    // })
    this.getAllProduct()
  }

  getAllProduct(){
    this.productService.allProduct().subscribe(data =>{
      this.all_doctor_data = data;
      console.log("My All Doctors", this.all_doctor_data)
    }, error =>{
      console.log("Somthing went wrong ", error)
    })
  }
}
