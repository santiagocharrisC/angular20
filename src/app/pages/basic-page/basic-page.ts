import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.html',

})
export default class BasicPage {

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
}
