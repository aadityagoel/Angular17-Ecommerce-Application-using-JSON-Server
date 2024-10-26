import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

// Admin before login check (Redirects if already logged in as admin)
@Injectable({
  providedIn: "root"
})
export class AdminAuthGuardLogin implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem("role");
    if (role === "admin") {
      this.router.navigate(["/admin-dashboard"]); // Redirect to admin dashboard if already logged in
      return false;
    } else {
      return true;
    }
  }
}

// Admin after login check (Allows access to admin dashboard if logged in as admin)
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem("role");
    if (role === 'admin') {
      return true;
    } else {
      this.router.navigate(["/admin-login"]); // Redirect to admin login if not an admin
      return false;
    }
  }
}

// Doctor before login check (Redirects if already logged in as doctor)
@Injectable({
  providedIn: "root"
})
export class DoctorAuthGuardLogin implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem("role");
    if (role === "doctor") {
      this.router.navigate(["/seller-dashboard"]); // Redirect to doctor dashboard if already logged in
      return false;
    } else if (role == "user") {
      this.router.navigate(["/buyer-dashboard"]);
      return false;
    } else {
      return true;
    }
  }
}

// Doctor after login check (Allows access to doctor dashboard if logged in as doctor)
@Injectable({
  providedIn: 'root'
})
export class DoctorAuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem("role");
    if (role === 'doctor') {
      return true;
    } else {
      this.router.navigate(["/sign-in"]); // Redirect to sign-in page if not logged in as doctor
      return false;
    }
  }
}

// User after login check (Allows access to user dashboard if logged in as user)
@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem("role");
    if (role === 'user') {
      return true;
    } else {
      this.router.navigate(["/sign-in"]); // Redirect to sign-in page if not logged in as user
      return false;
    }
  }
}
