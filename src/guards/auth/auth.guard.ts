import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // הגדרת פונקציית Guard

  // אם המשתמש מחובר (יש טוקן)
  if (authService.isAuthenticated()) {
    return true;
  }

  // אם לא מחובר, נוודא שהוא יעבור לעמוד התחברות
  router.navigate(['/login']);
  return false;
};

