import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses/courses.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LessonsService } from '../../services/lessons/lessons.service';
import { Course } from '../../modules/course.module';
import { Lesson } from '../../modules/lesson.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  courseData: any;
  postLessonForm: FormGroup;
  token: string = sessionStorage.getItem("token") ?? "";
  isEditMode = false;
  lessonData: any;
  constructor(private fb: FormBuilder, private lessonService: LessonsService, private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.courseData = navigation?.extras.state?.['courseData'];
    this.lessonData = navigation?.extras.state?.['lesson'];
    if (this.lessonData)
      this.isEditMode = true
    this.postLessonForm = this.fb.group({
      lesson: this.fb.group({
        title: [this.lessonData ? this.lessonData.title : '', Validators.required],
        content: [this.lessonData ? this.lessonData.content : '', Validators.required],
      })
    });
  }
  
  onSubmit(): void {
    if (this.isEditMode) {
      this.lessonService.updateLesson(
        this.postLessonForm.value.lesson.title,
        this.postLessonForm.value.lesson.content,
        this.courseData.id,
        this.token,
        this.lessonData.id // ה-ID של השיעור שאתה מעדכן
      ).subscribe({
        next: (data) => {
          console.log("השיעור עודכן בהצלחה");
          console.log(data);
        },
        error: (err) => console.log("שגיאה בעדכון השיעור", err)
      });
    }
    else {
      if (this.postLessonForm && this.postLessonForm.valid) {
        console.log(this.postLessonForm.value.lesson);
        this.lessonService.createLesson(this.postLessonForm.value.lesson.title, this.postLessonForm.value.lesson.content, this.courseData.id, this.token).subscribe({
          next: (data) => console.log("הקורס נוסף בהצלחה"), error: (err) => console.log("no")
        });
      };
    }
  }
}
