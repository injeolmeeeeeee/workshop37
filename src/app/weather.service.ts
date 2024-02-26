import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'd63a6f0a8ac266094f30eea01cdb2be6';

  constructor(private http: HttpClient) { }

  fetchWeatherData(cityName: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`;
    console.log('Making API call to fetch weather data for city:', cityName);
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching weather data:', error);
        throw error;
      })
    );
  }  
}