import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { CoursesListComponent } from '../components/courses-list/courses-list.component';
import { CourseManagementComponent } from '../components/course-management/course-management.component';
import { LessonsListComponent } from '../components/lessons-list/lessons-list.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'coursesList', component: CoursesListComponent },
  { path: 'lessonsList', component: LessonsListComponent },
  { path: 'manageCourses', component: CourseManagementComponent },
  { path: 'addLesson', component: AddLessonComponent },
];
