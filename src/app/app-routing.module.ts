import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './components/citylist.component';
import { WeatherComponent } from './components/weather.component';

const routes: Routes = [
  { path: 'cities', component: CityListComponent },
  { path: 'weather/:city', component: WeatherComponent },
  { path: '**', redirectTo: '/cities', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
