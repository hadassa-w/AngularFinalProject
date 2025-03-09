import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private authService: AuthService) {}

  register(user: { name: string, email: string, password: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user); // קריאה להרשמה
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials); // קריאה להתחברות
  }

  // בדוק אם המשתמש מחובר (על פי טוקן)
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // הצטרפות לקורס
  joinCourse(courseId: number): Observable<any> {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      return this.http.post(`${this.apiUrl}/courses/${courseId}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    throw new Error('משתמש לא מחובר');
  }

  // עזיבת קורס
  leaveCourse(courseId: number): Observable<any> {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      return this.http.post(`${this.apiUrl}/courses/${courseId}/leave`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    throw new Error('משתמש לא מחובר');
  }

  // בדוק אם המשתמש הצטרף לקורס
  isEnrolled(courseId: number): boolean {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolled_courses') || '[]');
      return enrolledCourses.includes(courseId);
    }
    return false;
  }
}
