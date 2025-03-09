import { Component } from '@angular/core';
import { Course } from '../../modules/course.module';
import { CoursesService } from '../../services/courses/courses.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {
  courses: Course[] = [];
  newCourse: Course = new Course(0, '', '', 0);

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses', err);
      }
    });
  }

  addCourse(): void {
    this.coursesService.createCourse(this.newCourse).subscribe({
      next: (course) => {
        this.courses.push(course);
        this.newCourse = new Course(0, '', '', 0); // איפוס השדות לאחר הוספת הקורס
      },
      error: (err) => {
        console.error('Error adding course', err);
      }
    });
  }

  editCourse(course: Course): void {
    this.coursesService.updateCourse(course.id, course).subscribe({
      next: () => {
        console.log('Course updated successfully');
      },
      error: (err) => {
        console.error('Error updating course', err);
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
}
