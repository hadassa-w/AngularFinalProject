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
  imports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {
  courses: Course[] = [];
  newCourse: Course = new Course('', '', 0);
  token: string | any = sessionStorage.getItem("token")
  role: string | any = localStorage.getItem('role')
  postCourseForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder,private coursesService: CoursesService,private router:Router) {
    const navigation = this.router.getCurrentNavigation();
    const courseData = navigation?.extras.state?.['courseData'];
    this.postCourseForm = this.fb.group({
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
    this.coursesService.createCourse(this.newCourse.title,this.newCourse.description,this.newCourse.teacherId, this.token).subscribe({
      next: (course) => {
        this.courses.push(course);
        this.newCourse = new Course('', '', 0); // איפוס השדות לאחר הוספת הקורס
      },
      error: (err) => {
        console.error('Error adding course', err);
      }
    });
  }

  // editCourse(course: Course): void {
  //   this.coursesService.updateCourse(course, this.token, course.id).subscribe({
  //     next: () => {
  //       console.log('Course updated successfully');
  //     },
  //     error: (err) => {
  //       console.error('Error updating course', err);
  //     }
  //   });
  // }

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
    //const storedUserId = localStorage.getItem('userId');
    const userId: number | null = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : null;

    console.log(userId);
    console.log(this.postCourseForm.value.course.id);

    if (this.isEditMode) {
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.coursesService.updateCourse(this.postCourseForm.value.course.title, this.postCourseForm.value.course.description,userId, this.token, this.postCourseForm.value.course.id).subscribe({
          next: (data) => {
            console.log("הקורס עודכן בהצלחה")
            console.log(data);

          }
          , error: (err) => console.log("no")
        });
      };
    }
    else {
      if (this.postCourseForm.valid) {
        console.log(this.postCourseForm.value);
        this.coursesService.createCourse(this.postCourseForm.value.course.title, this.postCourseForm.value.course.description, userId, this.token).subscribe({
          next: (data) => console.log("הקורס נוסף בהצלחה"), error: (err) => console.log("no")
        });
      };
    }
  }

}
