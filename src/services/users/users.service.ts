import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../../modules/user.module';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/auth';
  token: string | any = sessionStorage.getItem("token")
  role: string | any = localStorage.getItem('role')
  message: string | null = null; // משתנה להודעה

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          sessionStorage.setItem("token", response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('role', response.role);

          console.log(sessionStorage.getItem("token"));
          console.log(localStorage.getItem("userId"));
        }
      })
    );
  }

  register(user: { name: string, email: string, password: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        if (response.token) {
          sessionStorage.setItem("token", response.token)
          console.log(sessionStorage.getItem("token"));
        }
      })
    )
  }

  // בדוק אם המשתמש מחובר (על פי טוקן)
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // הצטרפות לקורס
  joinCourse(courseId: number) {
    // if (this.authService.isAuthenticated()) {
    //   const token = this.authService.getToken();
    //   return this.http.post(`${this.apiUrl}/courses/${courseId}/join`, {}, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    // }
    // throw new Error('משתמש לא מחובר');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const userId: string | null = localStorage.getItem('userId');
    this.http.post<User>(`http://localhost:3000/api/courses/${courseId}/enroll`, { userId }, { headers }).pipe(
      tap((response) => {
        console.log('the user join successfully', response);
      }),
      catchError((error) => {
        console.error('Error ', error); // טיפול בשגיאות
        this.message='הנך רשום כבר לקורס זה';
        return of(null);
      })
    ).subscribe();
  }

  // עזיבת קורס
  leaveCourse(courseId: number){
    if (this.token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      const userId: string | null = localStorage.getItem('userId');
      this.http.delete<User>(`http://localhost:3000/api/courses/${courseId}/unenroll`, {
        headers,
        body: { userId } // הוספת userId לגוף הבקשה
      }).pipe(
        tap((response) => {
          console.log('the user delete successfully', response);
        }),
        catchError((error) => {
          console.error('Error ', error); // טיפול בשגיאות
          this.message='הנך לא רשום לקורס זה';
          return of(null);
        })
      ).subscribe();
    } else {
      console.error('Token is not available');
    }
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
