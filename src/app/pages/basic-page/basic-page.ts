import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locole.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.html',

})
export default class BasicPage {
localeService = inject(LocaleService)
currentLocale = signal( inject(LOCALE_ID))

nameLower = signal('SANTIAGO')
nameUpper = signal('andres')
fullname = signal('saNtiAgO aNdReS ChaRris CaMaRgo')


customDate = signal(new Date());
  tickingDataEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log('tick')
    },1000);

    onCleanup(() => {
      clearInterval(interval)
    })
  })

changeLocale(locale: AvailableLocale) {
  console.log({locale});
  this.localeService.changeLocale(locale);
}
}
