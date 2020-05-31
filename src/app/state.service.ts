import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor( private http: HttpClient) { }

  getData(){
    //return this.http.get("https://api.covid19india.org/state_district_wise.json");
    return fetch("https://api.covid19india.org/v2/state_district_wise.json");
  }
}
