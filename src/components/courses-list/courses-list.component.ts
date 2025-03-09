import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../modules/course.module';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private usersService: UsersService,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses', err);
      }
    });
  }

  toggleEnrollment(courseId: number) {
    if (this.isEnrolled(courseId)) {
      this.leaveCourse(courseId);
    } else {
      this.joinCourse(courseId);
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.usersService.isEnrolled(courseId);
  }

  joinCourse(courseId: number): void {
    this.usersService.joinCourse(courseId).subscribe({
      next: () => {
        console.log('הצטרפת לקורס בהצלחה!');
        this.loadCourses(); // נטען מחדש את הקורסים
      },
      error: (err) => {
        console.log('שגיאה בהצטרפות לקורס');
        console.error(err);
      }
    });
  }

  leaveCourse(courseId: number): void {
    this.usersService.leaveCourse(courseId).subscribe({
      next: () => {
        console.log('עזבת את הקורס בהצלחה!');
        this.loadCourses(); // נטען מחדש את הקורסים
      },
      error: (err) => {
        console.log('שגיאה בעזיבת הקורס');
        console.error(err);
      }
    });
  }
  //  courses: Course[] = [];

  // constructor(
  //   private usersService: UsersService,
  //   private coursesService: CoursesService
  // ) { }

  // // ngOnInit() {
  // //   this.loadCourses();
  // // }

  // loadCourses() {
  //   this.coursesService.getCourses().subscribe(courses => {
  //     this.courses = courses;
  //   });
  // }

  // toggleEnrollment(courseId: number) {
  //   if (this.isEnrolled(courseId)) {
  //     this.usersService.leaveCourse(courseId);
  //   } else {
  //     this.usersService.joinCourse(courseId);
  //   }
  // }

  // isEnrolled(courseId: number): boolean {
  //   return this.usersService.isEnrolled(courseId);
  // }

  // // courses: any[] = [];

  // // constructor(private coursesService: CoursesService) { }

  // ngOnInit(): void {
  //   // קבלת כל הקורסים
  //   this.coursesService.getCourses().subscribe({
  //     next: (data) => {
  //       this.courses = data;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching courses', err);
  //     }
  //   });
  // }

  // joinCourse(courseId: number): void {
  //   // כאן נבצע קריאה ל-API כדי להצטרף לקורס
  //   this.coursesService.joinCourse(courseId).subscribe({
  //     next: () => {
  //       alert('הצטרפת לקורס בהצלחה!');
  //       this.ngOnInit(); // נטען מחדש את הקורסים
  //     },
  //     error: (err) => {
  //       alert('שגיאה בהצטרפות לקורס');
  //       console.error(err);
  //     }
  //   });
  // }

  // leaveCourse(courseId: number): void {
  //   // כאן נבצע קריאה ל-API כדי לעזוב את הקורס
  //   this.coursesService.leaveCourse(courseId).subscribe({
  //     next: () => {
  //       alert('עזבת את הקורס בהצלחה!');
  //       this.ngOnInit(); // נטען מחדש את הקורסים
  //     },
  //     error: (err) => {
  //       alert('שגיאה בעזיבת הקורס');
  //       console.error(err);
  //     }
  //   });
  // }

}
