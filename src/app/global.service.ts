import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  getData(){
    //return this.http.get("https://api.covid19india.org/state_district_wise.json");
    return fetch("https://api.covid19api.com/summary");
  }
}
