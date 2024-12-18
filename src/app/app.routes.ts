import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { ProductComponent } from './product/product.component';
import { SigninSignupComponent } from './customer/signin-signup/signin-signup.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboadComponent } from './customer/buyer/buyer-dashboad/buyer-dashboad.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { AdminAuthGuardLogin, AdminAuthGuardService, DoctorAuthGuardLogin, DoctorAuthGuardService, UserAuthGuardService } from './shared/services/auth-guard.service';
import { DoctorsComponent } from './doctors/doctors.component';
import { ManageDoctorComponent } from './admin/manage-doctor/manage-doctor.component';
import { ManageContactComponent } from './admin/manage-contact/manage-contact.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "my-profile", component: UserProfileComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "doctors", component: DoctorsComponent },
  { path: "all-courses", component: AllCoursesComponent },
  { path: 'course-detail/:id', component: CourseDetailComponent },

  //admin
  {
    path: '', canActivate: [AdminAuthGuardLogin], children: [
      { path: "admin-login", component: AdminLoginComponent }
    ]
  },
  {
    path: '', canActivate: [AdminAuthGuardService], children: [
      { path: "admin-dashboard", component: AdminDashboardComponent },
      { path: "admin/user", component: UserCrudComponent },
      { path: "admin/product", component: ProductComponent },
      { path: "admin/manage-doctor", component: ManageDoctorComponent },
      { path: "admin/manage-contact", component: ManageContactComponent }
    ]
  },
  {
    path: '', 
    canActivate: [DoctorAuthGuardLogin], 
    // canActivate: [AdminAuthGuardLogin, DoctorAuthGuardLogin],
    children: [
      { path: "sign-in", component: SigninSignupComponent },
      { path: "sign-up", component: SigninSignupComponent },
    ]
  },
  {
    path: '', canActivate: [DoctorAuthGuardService], children: [
      { path: "seller-dashboard", component: SellerDashboardComponent },
      { path: "seller/product", component: ProductComponent }
    ]
  },
  {
    path: '', canActivate: [UserAuthGuardService], children: [
      { path: "buyer-dashboard", component: BuyerDashboadComponent },
      { path: "checkout", component: CheckoutComponent }
    ]
  },
  { path: "**", component: PageNotFoundComponent }
];
