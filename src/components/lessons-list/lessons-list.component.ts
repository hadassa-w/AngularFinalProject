import { Component } from '@angular/core';
import { Lesson } from '../../modules/lesson.module';
import { LessonsService } from '../../services/lessons/lessons.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lessons-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lessons-list.component.html',
  styleUrl: './lessons-list.component.css'
})
export class LessonsListComponent {
  lessons: Lesson[] = []; // מערך המשתמשים
  token: string | any = sessionStorage.getItem("token")
  role: string | any = localStorage.getItem('role')
  courseData: any;

  constructor(private courseService: LessonsService, private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.courseData = navigation?.extras.state?.['courseData'];
  }

  deleteLesson(lessonId: number | undefined) {
    const courseId: number = this.courseData.id
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    // ודא שהכתובת נכונה
    this.http.delete(`http://localhost:3000/api/courses/${courseId}/lessons/${lessonId}`, { headers })
      .subscribe(
        (response) => {
          console.log('Lesson deleted successfully', response);
          // עדכון המערך לאחר מחיקת השיעור
          this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
        },
        (error) => {
          console.error('Error deleting lesson', error); // טיפול בשגיאות
        }
      );
  }
  editLesson(lesson: any) {
    const course = this.courseData
    const courseData = JSON.parse(JSON.stringify(course));
    this.router.navigate(['/addLesson'], { state: { courseData, lesson } });
  }
  AddLesson() {
    const course = this.courseData
    const courseData = JSON.parse(JSON.stringify(course)); // המרת ה-Class לאובייקט פשוט
    this.router.navigate(['/addLesson'], { state: { courseData } });
  }  ngOnInit() {
    console.log(this.courseData);
    
    this.courseService.getLessons(this.token, this.courseData.id).subscribe(
      (data) => {
        this.lessons = data; // שמירת המידע במערך
      },
      (error) => {
        console.error('Error fetching users', error); // טיפול בשגיאות
      }
    );
  }
}
