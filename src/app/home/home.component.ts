import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts=[];
  deaths;
  recovered;
  confirmed;
  global=[];

  constructor(private _global:GlobalService) { }

  ngOnInit() {
    this._global.getData().then((Response) => {
      Response.json().then((data) => {
        this.posts=data;
        this.deaths = this.posts["Global"]["TotalDeaths"];
        this.recovered = this.posts["Global"]["TotalRecovered"];
        this.confirmed = this.posts["Global"]["TotalConfirmed"];
        this.global.push(this.confirmed, this.deaths, this.recovered);
      })
    })
  }

}
