import { CountryService } from './../../services/country';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { Continent } from '../../interfaces/continent.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


function validateQueryParam(queryParam: string): Continent {
  queryParam = queryParam.toLocaleLowerCase();
  const validContinent: Record<string, Continent> ={
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic'
  }

  return validContinent[queryParam] ?? 'Americas'
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-Region-Page.html',
})
export class ByRegionPage {

  CountryService = inject(CountryService)

   public continents: Continent[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('continents') ?? '';
  selectedContinent = linkedSignal<Continent>(() => validateQueryParam(this.queryParam));

    countryResource = rxResource ({
    params: () => ({continent: this.selectedContinent()}),
    stream: ({params}) => {

      console.log({params: params.continent})
      if (!params.continent) return of([]);

        this.router.navigate(['/country/by-continent'],{
        queryParams: {
          continents: params.continent
        },
      })

        return this.CountryService.searchByContinent(params.continent);
    }
  })

}

