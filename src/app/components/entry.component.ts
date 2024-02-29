import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {city} from '../models';
import { CityStore } from '../citylist.store';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit {

  private fb = inject(FormBuilder)
  private cityStore = inject(CityStore)

  protected form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  add() {
    const entry: city = {
      name: this.form.value['name'],
    }
    console.info('>>> entry: ', entry)
    this.cityStore.add(entry)
      .then(result => {
        console.log('Entry added successfully:', result);
        this.form.reset()
      })
      .catch(error => {
        console.error('Error adding entry:', error);
      });
  }

  private createForm(): FormGroup {
    const t = new Date()
    return this.fb.group({
      name: this.fb.control<string>(''),
    })
  }
}