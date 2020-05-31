import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckService } from '../check.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: FormGroup;
  value;

  constructor(
    private router: Router,
    private _log: CheckService
  ) {
    this.userform = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
  }

  senddata() {
    console.log(this.userform.value);
    let answer = this.userform.value
    console.log("answer", answer);
    console.log(answer["firstName"]);
    if (this.userform.valid) {
      let result = fetch("https://zen-user-api.herokuapp.com/users/authenticate", {
        method: "POST",
        body: JSON.stringify({
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
          console.log(this.value["token"]);
          if (this.value['token'] != undefined) {
            this.router.navigate(['/report']);
          }
        })
      })
      /*this._register.verify().then((response) => {
        response.json().then((data) => {
          this.value = data;
        })
      })*/
    }
    /*if(this.userform.valid){
      this._log.getToken().then((response) => {
        response.json().then((data) => {
          this.value = data;
        })
      })
    }
    /*if(this.userform.valid){
      this.log.login(this.userform.value).subscribe((result) => {
        if(result.success){
          console.log(result);
          alert(result.message);
          this.router.navigate(['/report']);
        }else{
          alert(result.message);
        }
      })
    }*/

  }

}
