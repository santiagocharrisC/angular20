import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipe/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { CanFlyPipe } from '../../pipe/CanFly.Pipe';
import { HeroColorPipe } from '../../pipe/HeroColor.pipe';
import { HeroTextColorPipe } from '../../pipe/HeroTextColor.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../pipe/heroCreator.pipe';
import { HeroSortByPipe } from '../../pipe/heroSortBy.pipe';
import { Hero } from '../../interfaces/hero.interface';
@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    HeroTextColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
    HeroSortByPipe
  ],
  templateUrl: './custom-page.html',
})
export default class CustomPage {
  name = signal('Santiago Charris Camargo')

  upperCase = signal(true);

  heroes = signal(heroes)

  sortBy = signal<keyof Hero | null>(null)
}
