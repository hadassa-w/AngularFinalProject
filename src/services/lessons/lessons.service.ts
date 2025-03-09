import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getLessons(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses/${courseId}/lessons`);
  }
  
  getLessonsByCourseId(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/lessons`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  createLesson(courseId: number, lesson: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${courseId}/lessons`, lesson, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  updateLesson(courseId: number, lessonId: number, lesson: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  deleteLesson(courseId: number, lessonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    });
  }

  downloadLessonMaterials(courseId: number, lessonId: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/${courseId}/lessons/${lessonId}/materials`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      responseType: 'blob' as 'json', // חשוב כדי להוריד קובץ
    });
  }
}
