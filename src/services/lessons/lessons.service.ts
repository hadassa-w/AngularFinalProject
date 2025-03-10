import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../modules/lesson.module';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getLessons(token: string, id: number): Observable<any[]> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    return this.http.get<any[]>(`${this.apiUrl}/${id}/lessons`, { headers });
  }

  createLesson(title: string, content: string, courseId: number | null,  token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });

    const lesson = { title, content, courseId };
    console.log("Creating lesson:", lesson);

    // ודא שהכתובת נכונה
    return this.http.post<Lesson>(`${this.apiUrl}/${courseId}/lessons`, lesson, { headers });
  }

  updateLesson(title: string, content: string, courseId: number, token: string, lessonId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });

    const lesson = { title, content, courseId };
    return this.http.put<Lesson>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers });
  }

  getLessonsByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/lessons`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }
}
