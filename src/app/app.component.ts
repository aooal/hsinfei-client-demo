import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './sharedModule';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'hsinfei-client-demo';
  aa = 0;
  bb(data: number): number {
    data++;
    return data;
  }
}
