import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterauthService {

  constructor(private http: HttpClient) { }

  verify() {
    return fetch("https://zen-user-api.herokuapp.com/users/register", {
      method: "POST",
      body: JSON.stringify({
        "firstName": "add",
        "lastName": "r",
        "email": "user@guvi.in",
        "password": "admin"
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }
}
