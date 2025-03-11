import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../modules/course.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { User } from '../../modules/user.module';

import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InformationComponent } from "../information/information.component";

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatDividerModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, RouterLink, InformationComponent],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  token: string | null = null;
  role: string | null = null;
  message: string | null = null; // משתנה להודעה

  constructor(
    private coursesService: CoursesService,
    private http: HttpClient,
    private router: Router
  ) {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      this.token = sessionStorage.getItem("token");
      this.role = localStorage.getItem('role');
    }
  }

  ngOnInit(): void {
    this.loadCourses();
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      this.role = localStorage.getItem('role');
    }
  }

  loadCourses() {
    if (this.token) {
      this.coursesService.getCourses(this.token).pipe(
        tap((data) => {
          this.courses = data; // שמירת המידע במערך
        }),
        catchError((error) => {
          console.error('Error fetching courses', error); // טיפול בשגיאות
          return of([]);
        })
      ).subscribe();
    } else {
      console.error('Token is not available');
    }
  }

  editCourse(course: any) {
    this.router.navigate(['/manageCourses'], { state: { courseData: course } });
  }

  getLessons(course: any) {
    console.log('course', course);
    console.log(course.id);
    this.router.navigate(['/lessonsList'], { state: { courseData: course } });
  }

  joinCourse(course: Course) {
    if (this.token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      const userId: string | null = localStorage.getItem('userId');
      this.http.post<User>(`http://localhost:3000/api/courses/${course.id}/enroll`, { userId }, { headers })
        .subscribe({
          next: (response) => {
            alert('the user join successfully');
            console.log('the user join successfully', response);
          },
          error: (error) => {
            console.error('Error ', error); // טיפול בשגיאות
            alert('You are already registered for this course.');
          }
        });
    } else {
      console.error('Token is not available');
    }
  }

  leaveCourse(course: Course) {
    if (this.token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      const userId: string | null = localStorage.getItem('userId');
      this.http.delete<User>(`http://localhost:3000/api/courses/${course.id}/unenroll`, {
        headers,
        body: { userId } // הוספת userId לגוף הבקשה
      })
        .subscribe({
          next: (response) => {
            alert('the user delete successfully');
            console.log('the user delete successfully', response);
          },
          error: (error) => {
            console.error('Error ', error); // טיפול בשגיאות
            alert('You are not registered for this course.');
          }
        });
    } else {
      console.error('Token is not available');
    }
  }

  deleteCourse(id: number | undefined) {
    if (this.token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });

      this.http.delete(`http://localhost:3000/api/courses/${id}`, { headers })
        .subscribe({
          next: (response) => {
            alert('Course deleted successfully');
            console.log('Course deleted successfully', response);
            this.courses = this.courses.filter(course => course.id !== id);
          },
          error: (error) => {
            console.error('Error deleting course', error); // טיפול בשגיאות
          }
        });
    } else {
      console.error('Token is not available');
    }
  }
}