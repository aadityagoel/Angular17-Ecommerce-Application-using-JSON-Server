import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrlPipe } from '../shared/pipes/safe-resource-url.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, SafeResourceUrlPipe],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})

export class CourseDetailComponent  implements OnInit {
  courseId!: number;
  selectedImage: string | null = null;
  courseContent: { name: string, pdf: string, images: string[] } | null = null;

  // Mock data for demonstration
  courseData: { [key: number]: {  name: string, pdf: string, images: string[] } } = {
    1: {  name: 'Basic Diagnostic & Therapeutic Intervention Course', pdf: '', images: ['assets/uploads/courses/sample_image.jpg'] },
    2: {  name: 'Advanced Fetal Medicine Course', pdf: 'assets/uploads/courses/Apex New Flyer for 2025 Batch.pdf', images: [] },
  };

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Get the course ID from the route
    this.route.params.subscribe(params => {
      this.courseId = +params['id'];  // Convert ID to number
      this.courseContent = this.courseData[this.courseId] || null; // Fetch course data by ID
    });
  }
  // Open the full-page image view
  viewImage(img: string): void {
    this.selectedImage = img;
  }

  // Close the full-page image view
  closeImage(): void {
    this.selectedImage = null;
  }

  // Sanitize PDF URLs
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}