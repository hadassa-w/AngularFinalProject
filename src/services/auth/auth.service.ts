import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // פונקציה שבודקת אם המשתמש מחובר
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') { // בדוק אם הקוד רץ בדפדפן
      return !!localStorage.getItem('token');  // אם יש טוקן, הוא מחובר
    }
    return false; // אם לא רץ בדפדפן, החזר false
  }

  // פונקציה לכניסה למערכת
  login(token: string): void {
    if (typeof window !== 'undefined') { // בדוק אם הקוד רץ בדפדפן
      localStorage.setItem('token', token);  // מאחסן את הטוקן ב-localStorage
    }
  }

  // פונקציה ליציאה מהמערכת
  logout(): void {
    if (typeof window !== 'undefined') { // בדוק אם הקוד רץ בדפדפן
      localStorage.removeItem('token');  // מסיר את הטוקן
    }
  }

  // פונקציה לקבלת הטוקן (אם צריך)
  getToken(): string | null {
    if (typeof window !== 'undefined') { // בדוק אם הקוד רץ בדפדפן
      return localStorage.getItem('token');
    }
    return null; // אם לא רץ בדפדפן, החזר null
  }
}
