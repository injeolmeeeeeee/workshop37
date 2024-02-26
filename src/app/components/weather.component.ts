import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  city !: string;
  temperature: number | undefined;
  weatherDescription: string = '';
  weatherSubscription !: Subscription;
  feelsLike !: string;
  

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.city = params['city'];
      this.fetchWeatherData(this.city);
    });
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  fetchWeatherData(cityName: string): void {
    this.weatherSubscription = this.weatherService.fetchWeatherData(cityName)
      .subscribe(
        (weatherData: any) => {
          this.temperature = weatherData.main.temp;
          this.feelsLike = weatherData.main.feels_like;
          this.weatherDescription = weatherData.weather[0].description;
        },
        (error: any) => {
          console.error('Error fetching weather data for', cityName, ':', error);
        }
      );
  }
}
