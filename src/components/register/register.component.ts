import { Component } from '@angular/core';
import { NgForm, FormGroupDirective, FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { Router, RouterModule } from '@angular/router';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatDividerModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  private router: Router; // הוספת המשתנה router כמאפיין של הקומפוננטה
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private usersService: UsersService, router: Router) {
    this.router = router; // השמת הערך של הפרמטר למשתנה הפרטי
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required] // ברירת מחדל לסטודנט
    });
  }

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    if (this.registerForm.valid) {
      this.usersService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/login']); // הפנה למסך ההתחברות לאחר הרשמה מוצלחת
        },
        error: (error) => {
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration failed', error);
        }
      });
    }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}