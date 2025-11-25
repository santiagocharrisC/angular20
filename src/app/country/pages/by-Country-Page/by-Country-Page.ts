import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInput } from "../../components/country-search-input/country-search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { catchError, of, tap } from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-Country-Page.html',
})
export class ByCountryPage {


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
      this.router.navigate(['/country/by-country'],{
        queryParams: {
          query: params.query
        },
      })
      return this.CountryService.searchByCountry(value).pipe(
        tap(() => console.log({query: value})),
        catchError(() => of([]))
      )
    }
  })
}
