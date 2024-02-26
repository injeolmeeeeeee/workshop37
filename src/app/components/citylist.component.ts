import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citylist',
  templateUrl: './citylist.component.html',
  styleUrls: ['./citylist.component.css']
})
export class CityListComponent implements OnInit {
  cities: string[] = [];
  cityForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router : Router) {
    this.cityForm = this.formBuilder.group({
      newCity: ['']
    });
  }

  ngOnInit(): void {
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      this.cities = JSON.parse(savedCities);
    }
  }

  addCity(): void {
    if (this.cityForm.valid) {
      const newCity = this.cityForm.value.newCity.trim();
      if (!this.cities.includes(newCity)) {
        this.cities.push(newCity);
        localStorage.setItem('cities', JSON.stringify(this.cities));
        this.cityForm.reset();
        this.errorMessage = '';
      } else {
        this.errorMessage = 'City already exists!';
      }
    } else {
      this.errorMessage = 'Please enter a city name!';
    }
  }

  removeCity(city: string): void {
    const index = this.cities.indexOf(city);
    if (index !== -1) {
      this.cities.splice(index, 1);
      localStorage.setItem('cities', JSON.stringify(this.cities));
    }
  }
  
  navigateToWeather(city: string): void {
    this.router.navigate(['weather', city]);
  }
}
