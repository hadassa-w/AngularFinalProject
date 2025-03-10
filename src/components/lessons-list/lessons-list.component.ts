import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../modules/lesson.module';
import { LessonsService } from '../../services/lessons/lessons.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatIconModule,],
  templateUrl: './lessons-list.component.html',
  styleUrl: './lessons-list.component.css'
})
export class LessonsListComponent implements OnInit {
  lessons: Lesson[] = [];
  token: string | any = null;
  role: string | any = null;
  courseData: any;

  constructor(private courseService: LessonsService, private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.courseData = navigation?.extras.state?.['courseData'];
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      this.token = sessionStorage.getItem("token");
      this.role = localStorage.getItem('role');
    }
  }

  ngOnInit() {
    console.log(this.courseData);

    this.courseService.getLessons(this.token, this.courseData.id).pipe(
      tap(data => {
        this.lessons = data; // שמירת המידע במערך
      }),
      catchError(error => {
        console.error('Error fetching lessons', error); // טיפול בשגיאות
        return of([]); // מחזיר מערך ריק במקרה של שגיאה
      })
    ).subscribe();
  }

  deleteLesson(lessonId: number | undefined) {
    const courseId: number = this.courseData.id;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`, { headers }).pipe(
      tap(response => {
        console.log('Lesson deleted successfully', response);
        // עדכון המערך לאחר מחיקת השיעור
        this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
      }),
      catchError(error => {
        console.error('Error deleting lesson', error); // טיפול בשגיאות
        return of(null); // מחזיר null במקרה של שגיאה
      })
    ).subscribe();
  }

  editLesson(lesson: any) {
    const course = this.courseData;
    const courseData = JSON.parse(JSON.stringify(course));
    this.router.navigate(['/addLesson'], { state: { courseData, lesson } });
  }

  AddLesson() {
    const course = this.courseData;
    const courseData = JSON.parse(JSON.stringify(course));
    this.router.navigate(['/addLesson'], { state: { courseData } });
  }
}
