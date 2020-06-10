import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterauthService } from '../registerauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userform: FormGroup;
  value;

  constructor(
    private router: Router,
    private _register: RegisterauthService
  ) {
    this.userform = new FormGroup({
      "firstName": new FormControl("", Validators.required),
      "lastName": new FormControl("", Validators.required),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
  }

  senddata() {
    //console.log(this.userform.value);
    let answer = this.userform.value
    console.log("answer", answer);
    console.log(answer["firstName"]);
    if (this.userform.valid) {
      let result = fetch("https://zen-user-api.herokuapp.com/users/register", {
        method: "POST",
        body: JSON.stringify({
          "firstName": answer["firstName"],
          "lastName": answer["lastName"],
          "email": answer["email"],
          "password": answer["password"]
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => {
        response.json().then((data) => {
          this.value = data;
          console.log(this.value);
        })
      })
      /*this._register.verify().then((response) => {
        response.json().then((data) => {
          this.value = data;
        })
      })*/
    }
    this.router.navigate(['/login']);
  }

  logout(){
    window.localStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
