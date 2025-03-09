import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Course } from '../../modules/course.module';
import { Lesson } from '../../modules/lesson.module';
import { CoursesService } from '../../services/courses/courses.service';
import { LessonsService } from '../../services/lessons/lessons.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courseId: number = 0;
  courseDetails: Course = new Course(0, "", "", 0);
  lessons: Lesson[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private lessonsService: LessonsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      console.log('Received ID from params:', idParam); // לוג לבדוק את ה-ID
      this.courseId = +idParam; // קריאת ה-ID מה-URL

      if (!isNaN(this.courseId) && this.courseId > 0) {
        this.loadCourseDetails(); // טוענים את פרטי הקורס והשיעורים
      } else {
        console.error('Invalid course ID:', idParam);
      }
    });
  }

  loadCourseDetails(): void {
    // קבלת פרטי הקורס
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (data) => {
        this.courseDetails = data;
      },
      error: (err) => {
        console.error('Error fetching course details', err);
      }
    });

    // קבלת רשימת שיעורים בקורס
    this.lessonsService.getLessonsByCourseId(this.courseId).subscribe({
      next: (data) => {
        this.lessons = data;
      },
      error: (err) => {
        console.error('Error fetching lessons', err);
      }
    });
  }

  downloadMaterials(lessonId: number): void {
    // הורדת חומרי לימוד של שיעור
  }
}
