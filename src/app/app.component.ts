import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  isOpenedSide: boolean = false;

  openedSide(e: any) {
    this.isOpenedSide = !this.isOpenedSide;
  }

  openedSideChanger(e: any) {
    if (e !== this.isOpenedSide) {
      this.isOpenedSide = !this.isOpenedSide;
    }
  }
}
