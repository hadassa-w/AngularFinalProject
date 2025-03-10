import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LessonsService } from '../../services/lessons/lessons.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})
export class AddLessonComponent {
  courseData: any;
  LessonForm: FormGroup;
  token: string | any = "";
  isEditMode = false;
  lessonData: any;

  constructor(private fb: FormBuilder, private lessonService: LessonsService, private http: HttpClient, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.courseData = navigation?.extras.state?.['courseData'];
    this.lessonData = navigation?.extras.state?.['lesson'];
    if (this.lessonData)
      this.isEditMode = true
    this.LessonForm = this.fb.group({
      lesson: this.fb.group({
        title: [this.lessonData ? this.lessonData.title : '', Validators.required],
        content: [this.lessonData ? this.lessonData.content : '', Validators.required],
      })
    });
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      this.token = sessionStorage.getItem("token");
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.lessonService.updateLesson(
        this.LessonForm.value.lesson.title,
        this.LessonForm.value.lesson.content,
        this.courseData.id,
        this.token == null ? "" : this.token,
        this.lessonData.id // ה-ID של השיעור שאתה מעדכן
      ).subscribe({
        next: (data) => {
          console.log("The lesson was successfully updated.");
          console.log(data);
        },
        error: (err) => console.log("Error updating lesson", err)
      });
    }
    else {
      if (this.LessonForm && this.LessonForm.valid) {
        console.log(this.LessonForm.value.lesson);
        this.lessonService.createLesson(this.LessonForm.value.lesson.title, this.LessonForm.value.lesson.content, this.courseData.id, this.token == null ? "" : this.token).subscribe({
          next: (data) => console.log("The course was added successfully."), error: (err) => console.log("ERROR: ", err)
        });
      };
    }
  }
}
