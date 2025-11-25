import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";


export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RESTCountry): Country  {

    return {
      capital: restCountry.capital?.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'no Spanish Name',
      population: restCountry.population,

      continete: restCountry.region,
      subContinete: restCountry.subregion
    }
  }

  static mapRestCountryArrayToCountryArray(restCountry: RESTCountry[]): Country[] {

    return restCountry.map(this.mapRestCountryToCountry)

  }
}
