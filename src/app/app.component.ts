import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { InformationComponent } from "../components/information/information.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule, MatIconModule, InformationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  parentData = true; // נתונים לשליחה לילד

  title = 'AngularProject';
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('token');
      }
    });
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
