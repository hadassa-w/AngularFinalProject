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
}
