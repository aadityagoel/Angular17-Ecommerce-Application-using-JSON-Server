import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email: string = 'airfs0112@gmail.com';
  mobile: string = '+91 73037 23841';
  mobiletrim: string = this.mobile.replace(/ +/g,'');
}
