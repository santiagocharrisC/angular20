import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroTextColorPipe'
})

export class HeroTextColorPipe implements PipeTransform {
  transform(textColor: Color): string {

    return ColorMap[textColor]

  }
}
