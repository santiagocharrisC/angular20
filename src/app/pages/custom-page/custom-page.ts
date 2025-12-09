import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipe/toggle-case.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe
  ],
  templateUrl: './custom-page.html',
})
export default class CustomPage {
  name = signal('Santiago Charris Camargo')

  upperCase = signal(true);
}
