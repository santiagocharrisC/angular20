import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Continent } from '../interfaces/continent.type';

const API_URL = 'https://restcountries.com/v3.1';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>
  private queryCacheCountry = new Map<string, Country[]>
  private queryCacheContinent = new Map<Continent, Country[]>

  searchByCapital( query: string ): Observable<Country[]> {
    query = query.toLowerCase();
    if(this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    return this.http
    .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    tap(countries => this.queryCacheCapital.set(query, countries)),
    delay(2000),
      catchError(() => of([]))
    );
  }

  searchByCountry(query: string): Observable<Country[]>{
    const url = `${API_URL}/name/${query}`

    query = query.toLowerCase();
    if(this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? [])
    }
    return this.http
    .get<RESTCountry[]>(url)
    .pipe(map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    tap(countries => this.queryCacheCountry.set(query, countries)),
    delay(2000),
      catchError(() => of([]))
    );
  }

  searchByContinent(continent: Continent): Observable<Country[]>{
    const url = `${API_URL}/region/${continent}`;

    if(this.queryCacheContinent.has(continent)) {
      return of(this.queryCacheContinent.get(continent) ?? [])
    }
    return this.http
    .get<RESTCountry[]>(url)
    .pipe(map( resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    tap(countries => this.queryCacheContinent.set(continent, countries)),
      catchError(() => of([]))
    );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`

    return this.http.get<RESTCountry[]>(url)
    .pipe(map( (resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
    map((countries) => countries.at(0)),
      catchError(() => of(undefined))
    );
  }
}
