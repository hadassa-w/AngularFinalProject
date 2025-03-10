import { Component } from '@angular/core';
import { Course } from '../../modules/course.module';
import { CoursesService } from '../../services/courses/courses.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {
  courses: Course[] = [];
  newCourse: Course = new Course('', '', 0);
  token: string | any = sessionStorage.getItem("token")
  role: string | any = localStorage.getItem('role')
  CourseForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private coursesService: CoursesService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const courseData = navigation?.extras.state?.['courseData'];
    this.CourseForm = this.fb.group({
      course: this.fb.group({
        title: [courseData ? courseData.title : '', Validators.required],
        description: [courseData ? courseData.description : '', Validators.required],
        id: [courseData ? courseData.id : null]
      })
    });
    if (courseData) {
      console.log(courseData.title);
      console.log('Edit mode');
      this.isEditMode = true;
    }
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getCourses(this.token).subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses', err);
      }
    });
  }

  addCourse(): void {
    this.coursesService.createCourse(this.newCourse.title, this.newCourse.description, this.newCourse.teacherId, this.token).subscribe({
      next: (course) => {
        this.courses.push(course);
        this.newCourse = new Course('', '', 0); // איפוס השדות לאחר הוספת הקורס
      },
      error: (err) => {
        console.error('Error adding course', err);
      }
    });
  }

  deleteCourse(courseId: number): void {
    this.coursesService.deleteCourse(courseId).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course.id !== courseId);
      },
      error: (err) => {
        console.error('Error deleting course', err);
      }
    });
  }

  onSubmit(): void {
    const userId: number | null = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : null;

    console.log(userId);
    console.log(this.CourseForm.value.course.id);

    if (this.isEditMode) {
      if (this.CourseForm.valid) {
        console.log(this.CourseForm.value);
        this.coursesService.updateCourse(this.CourseForm.value.course.title, this.CourseForm.value.course.description, userId, this.token, this.CourseForm.value.course.id).subscribe({
          next: (data) => {
            console.log("The course was successfully updated.")
            console.log(data);

          }
          , error: (err) => console.log("no")
        });
      };
    }
    else {
      if (this.CourseForm.valid) {
        console.log(this.CourseForm.value);
        this.coursesService.createCourse(this.CourseForm.value.course.title, this.CourseForm.value.course.description, userId, this.token).subscribe({
          next: (data) => console.log("The course was added successfully."), error: (err) => console.log("ERROR: ", err)
        });
      };
    }
  }

}
