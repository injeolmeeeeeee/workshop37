import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitylistComponent } from './components/citylist.component';
import { WeatherService } from './weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './components/weather.component';
import { CityStore } from './citylist.store';
import { EntryComponent } from './components/entry.component';

@NgModule({
  declarations: [
    AppComponent,
    CitylistComponent,
    WeatherComponent,
    EntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CityStore,WeatherService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
