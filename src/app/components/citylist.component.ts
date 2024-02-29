import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { city } from '../models';
import { CityStore } from '../citylist.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citylist',
  templateUrl: './citylist.component.html',
  styleUrl: './citylist.component.css'
})
export class CitylistComponent implements OnInit {

  cityStore = inject(CityStore);
  entries$!: Observable<city[]>;

  constructor(private router : Router) {}

  ngOnInit(): void {
    this.entries$ = this.cityStore.onEntries.asObservable()
        .pipe(
        tap(data => console.log('Received data:', data)),
         map(e => e.map(v => ({ name: v.name})))
        );
  }

  remove(city: string): void {
    console.log('Remove button clicked for city:', city);
    this.cityStore.removeCity(city);
  }  

  navigateToWeather(city: string): void {
    console.log('View Weather button clicked for city:', city);
    this.router.navigate(['weather', city]);
  }

}
