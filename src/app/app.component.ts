import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'angular-dashboard-post';
  listMenu: string[] = [
    'Dashboard',
    'Post',
  ];
}
