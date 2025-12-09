import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipe/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { CanFlyPipe } from '../../pipe/CanFly.Pipe';
import { HeroColorPipe } from '../../pipe/HeroColor.pipe';
@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe
],
  templateUrl: './custom-page.html',
})
export default class CustomPage {
  name = signal('Santiago Charris Camargo')

  upperCase = signal(true);

  heroes = signal(heroes)
}
