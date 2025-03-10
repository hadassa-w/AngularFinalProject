import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../modules/course.module';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  createCourse( title: string, description: string, teacherId: number | null , token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    const course = { title, description, teacherId }
    console.log(course)
    return this.http.post<Course>(`${this.apiUrl}`, course, { headers })
  }

  updateCourse( title: string, description: string, teacherId: number | null , token: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    const course = { title, description, teacherId }
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course, { headers })
  }


  getCourseById(courseId: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<any>(`${this.apiUrl}/${courseId}`, { headers });
  }

  deleteCourse(courseId: number): Observable<void> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.delete<void>(`${this.apiUrl}/${courseId}`, { headers });
  }
}
