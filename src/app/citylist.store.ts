import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { city } from "./models";
import { Subject } from "rxjs";

const ENTRY = 'entry';

@Injectable()
export class CityStore extends Dexie {
  private entry!: Dexie.Table<city, number>;
  onEntries = new Subject<city[]>();

  constructor() {
    super('citylist');
    this.version(1).stores({
      [ENTRY]: '++entryID, name'
    });
    this.entry = this.table(ENTRY);
    this.getCities().then((result) => this.onEntries.next(result));
  }

  // add(entry: city): Promise<any> {
  //   return this.entry.add(entry)
  //       .then(pk => {
  //         console.info('>> pk ', pk)
  //         return this.getCities()
  //       })
  //       .then(result => this.onEntries.next(result))
  // }

  add(entry: city): Promise<number> {
    return this.entry.add(entry)
        .then(pk => {
            console.info('>> pk ', pk);
            return this.getCities().then(result => {
                this.onEntries.next(result); // Pass the result to next()
                return pk; // Return primary key of the added entry
            });
        });
}


  // getCities(): Promise<city[]> {
  //   return this.entry
  //       .orderBy('date').reverse().toArray()
  // }

  getCities(): Promise<city[]> {
    return this.entry.toArray()
      .then(cities => {
        console.log('Retrieved cities:', cities);
        return cities.sort((a, b) => a.name.localeCompare(b.name));
      })
      .catch(error => {
        console.error('Error retrieving cities:', error);
        throw error;
      });
  }

  removeCity(cityName: string): Promise<void> {
    return this.entry.where('name').equals(cityName)
      .delete()
      .then(() => {
        console.log(`Successfully removed ${cityName} from the city list.`);
        return this.getCities();
      })
      .then(result => this.onEntries.next(result))
      .catch(error => {
        console.error('Error removing city:', error);
        throw error;
      });
  }
}
