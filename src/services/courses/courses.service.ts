import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getCourseById(courseId: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<any>(`${this.apiUrl}/${courseId}`, { headers });
  }

  createCourse(course: any): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.post<any>(this.apiUrl, course, { headers });
  }

  updateCourse(courseId: number, course: any): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.put<any>(`${this.apiUrl}/${courseId}`, course, { headers });
  }

  deleteCourse(courseId: number): Observable<void> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.delete<void>(`${this.apiUrl}/${courseId}`, { headers });
  }

  joinCourse(courseId: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.post<any>(`${this.apiUrl}/${courseId}/join`, {}, { headers });
  }

  leaveCourse(courseId: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.post<any>(`${this.apiUrl}/${courseId}/leave`, {}, { headers });
  }
}
