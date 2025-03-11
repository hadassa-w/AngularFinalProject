import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.css'
})
export class InformationComponent {
  @Input() data: boolean = true; // קבלת נתונים מהקומפוננטה ההורה

}
