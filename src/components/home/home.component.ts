import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { HomeDirective } from '../../directive/home/home.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCard, MatIcon, MatButtonModule, RouterLink,DatePipe,HomeDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentDate: Date = new Date(); // תאריך נוכחי

  constructor(private router: Router) { }

  viewCourses() {
    this.router.navigate(['courses']);
  }
}
