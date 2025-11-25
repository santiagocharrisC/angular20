import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.html',
})
export class CountrySearchInput {
  placeholder= input('Buscar');
    value = output<string>();
    initialValue = input<string>()
    debounceTime = input(300);

    inputValue = linkedSignal<string>(() => this.initialValue() ?? '')

    debounceEffect = effect((onCleanup) => {
      const value = this.inputValue();

      const timeout = setTimeout(() => {
        this.value.emit(value);
      }, this.debounceTime());

      onCleanup(() => {
        clearTimeout(timeout)
      })

    })

}
