import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor(private http: HttpClient) { }

  getToken() {
    //return this.http.get("https://api.covid19india.org/state_district_wise.json");
    return fetch("https://zen-user-api.herokuapp.com/users/authenticate", {
      method: "POST",
      body: JSON.stringify({
        "email": "user@guvi.in",
        "password": "admin"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }
}
