import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { CountryService } from '../../services/country';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList, CountrySearchInput],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  CountryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute)

  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam, {});

  countryResource = rxResource ({
    params: () => ({query: this.query()}),
    stream: ({params}) => {
      const value = params.query?.trim();
      if(!value) return of([]);
      this.router.navigate(['/country/by-capital'],{
        queryParams: {
          query: params.query
        },
      })
      return this.CountryService.searchByCapital(value).pipe(
        tap(() => console.log({query: value})),
        catchError(() => of([]))
      )
    }
  })
}
