import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitylistComponent } from './components/citylist.component';
import { WeatherComponent } from './components/weather.component';
import { EntryComponent } from './components/entry.component';

const routes: Routes = [
  { path: 'cities', component: CitylistComponent },
  { path: 'weather/:city', component: WeatherComponent },
  { path: 'add', component: EntryComponent },
  { path: '**', redirectTo: '/add', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
