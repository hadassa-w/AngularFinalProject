import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { Router, RouterModule } from '@angular/router';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  loginForm: FormGroup;
  private router: Router; // הוספת המשתנה router כמאפיין של הקומפוננטה
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private usersService: UsersService, router: Router) {
    this.router = router; // השמת הערך של הפרמטר למשתנה הפרטי
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    if (this.loginForm.valid) {
      this.usersService.login(this.loginForm.value).subscribe({
        next: (response) => {
          const token = response.token;
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigate(['/coursesList']);
          } else {
            this.errorMessage = 'No token received';
          }
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please check your email and password.';
          alert('Login failed');
          console.error('Login failed', error);
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