import { Routes } from "@angular/router";
import { ByCapitalPage } from "./pages/by-capital-page/by-capital-page";
import { CountryLayout } from "./layouts/countryLayout/countryLayout";
import { CountryPage } from "./pages/CountryPage/CountryPage";
import { ByCountryPage } from "./pages/by-Country-Page/by-Country-Page";
import { ByRegionPage } from "./pages/by-Region-Page/by-Region-Page";


export const countryroutes: Routes = [

  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path:'by-capital',
        component: ByCapitalPage
      },

      {
        path: 'by-country',
        component: ByCountryPage
      },

      {
        path:'by-continent',
        component:ByRegionPage
      },
      {
        path:'by/:code',
        component:CountryPage
      },

      {
        path: '**',
        redirectTo: 'by-capital'
      },
    ],
  },
];

export default countryroutes;
