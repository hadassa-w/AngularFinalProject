import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { CoursesListComponent } from '../components/courses-list/courses-list.component';
import { CourseManagementComponent } from '../components/course-management/course-management.component';
import { authGuard } from '../guards/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // הפניה לנתיב login כאשר הנתיב ריק
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'coursesList', component: CoursesListComponent },
    { path: 'courses/:id', component: CourseDetailsComponent },
    {
      path: 'manageCourses',
      component: CourseManagementComponent,
      canActivate: [authGuard], // הגבלת גישה למורים בלבד
    },
];
