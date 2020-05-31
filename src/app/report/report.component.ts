import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { NationalService } from '../national.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  posts = [];
  country = [];
  state_wise = [];
  country_wise = [];
  district = [];

  public lineChartData;
  public lineChartLabels;
  public lineChartOptions;
  public lineChartColors;
  public lineChartLegend;
  public lineChartType;
  public lineChartPlugins;

  public lineChartData1;
  public lineChartLabels1;
  public lineChartOptions1;
  public lineChartColors1;
  public lineChartLegend1;
  public lineChartType1;
  public lineChartPlugins1;

  public lineChartData2;
  public lineChartLabels2;
  public lineChartOptions2;
  public lineChartColors2;
  public lineChartLegend2;
  public lineChartType2;
  public lineChartPlugins2;

  public lineChartData3;
  public lineChartLabels3;
  public lineChartOptions3;
  public lineChartColors3;
  public lineChartLegend3;
  public lineChartType3;
  public lineChartPlugins3;
  constructor(
    private _authenticate: AuthenticateService,
    private _national: NationalService
  ) { }

  ngOnInit() {
    //CONFIRMED CASES
    this.lineChartData = [
      { data: [], 
        label: 'Total-Confirmed-Case' },
    ];
    this.lineChartLabels = [ 'February-1', 'March-1', 'April-1', 'May-1', 'June-1'];
    this.lineChartOptions = {
      responsive: true,
    };
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    this.lineChartPlugins = [];

    //DECEASED CASE
    this.lineChartData1 = [
      { data: [], 
        label: 'Total-Deceased-Case' },
    ];
    this.lineChartLabels1 = [ 'February-1', 'March-1', 'April-1', 'May-1', 'June-1'];
    this.lineChartOptions1 = {
      responsive: true,
    };
    this.lineChartColors1 = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    this.lineChartLegend1 = true;
    this.lineChartType1 = 'line';
    this.lineChartPlugins1 = [];

    //RECOVERED CASES
    this.lineChartData2 = [
      { data: [], 
        label: 'Total-Recovered-Case' },
    ];
    this.lineChartLabels2 = [ 'February-1', 'March-1', 'April-1', 'May-1', 'June-1'];
    this.lineChartOptions2 = {
      responsive: true,
    };
    this.lineChartColors2 = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    this.lineChartLegend2 = true;
    this.lineChartType2 = 'line';
    this.lineChartPlugins2 = [];

    //ACTIVE CASES
    this.lineChartData3 = [
      { data: [], 
        label: 'Total-Sample-Tested-Case' },
    ];
    this.lineChartLabels3 = [ 'February-1', 'March-1', 'April-1', 'May-1', 'June-1'];
    this.lineChartOptions3 = {
      responsive: true,
    };
    this.lineChartColors3 = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ];
    this.lineChartLegend3 = true;
    this.lineChartType3 = 'line';
    this.lineChartPlugins3 = [];

    this._authenticate.getData().then((response) => {
      response.json().then((data) => {
        this.posts = data;
        for (let key of Object.keys(this.posts)) {
          let state = [];
          let state_name = key;
          let con_case = 0;
          let dec_case = 0;
          let act_case = 0;
          let rec_case = 0;
          for (let key1 of Object.keys(this.posts[state_name])) {

            for (let key2 of Object.keys(this.posts[state_name][key1])) {
              //console.log(Object.keys(this.posts[state_name][key1][key2]));
              let key_name = Object.keys(this.posts[state_name][key1][key2]);

              for (let i = 0; i < key_name.length; i++) {
                if (key_name[i] == "confirmed") {

                  let count = this.posts[state_name][key1][key2][key_name[i]];
                  con_case = con_case + parseInt(count);

                }
                if (key_name[i] == "active") {

                  let count = this.posts[state_name][key1][key2][key_name[i]];
                  act_case = act_case + parseInt(count);

                }
                if (key_name[i] == "recovered") {

                  let count = this.posts[state_name][key1][key2][key_name[i]];
                  rec_case = rec_case + parseInt(count);

                }
                if (key_name[i] == "deceased") {

                  let count = this.posts[state_name][key1][key2][key_name[i]];
                  dec_case = dec_case + parseInt(count);

                }
              }

            }
          }
          state.push(state_name, con_case, act_case, rec_case, dec_case);
          this.state_wise.push(state)
        }

      });
    }).catch((err) => {
      console.log("Error generated:", err);
    });

    this._national.getData().then((response) => {
      response.json().then((data) => {
        this.country = data;
        let totalconfirmed = 0;
        let totaldeceased = 0;
        let totalrecovered = 0;
        let active = 0;
        let totalindividualstested = 0;
        let sample = 0;
        let key = Object.keys(this.country);
        for (let i = 0; i < key.length; i++) {
          if (key[i] == "cases_time_series") {
            let value = Object.values(this.country[key[i]]);
            //console.log(value);
            //console.log(value.length);
            for (let j = 0; j < value.length; j++) {
              //console.log(value[""+j+""]["totalconfirmed"]);
              totalconfirmed = totalconfirmed + parseInt(value["" + j + ""]["dailyconfirmed"]);
              totaldeceased = totaldeceased + parseInt(value["" + j + ""]["dailydeceased"]);
              totalrecovered = totalrecovered + parseInt(value["" + j + ""]["dailyrecovered"]);
              if((j%30) == 0){
                this.lineChartData[0]["data"].push(totalconfirmed);
                this.lineChartData1[0]["data"].push(totaldeceased);
                this.lineChartData2[0]["data"].push(totalrecovered);
              }
            }
          }
          if (key[i] == "statewise") {
            let value = Object.values(this.country[key[i]]);
            //console.log(value);
            for (let j = 0; j < 1; j++) {
              active = active + parseInt(value["" + j + ""]["active"]);
            }
          }
          if (key[i] == "tested") {
            let value = Object.values(this.country[key[i]]);
            //console.log(value);
            //console.log(value.length);
            for (let j = value.length -1; j < value.length; j++) {
              //console.log(value["" + j + ""]["totalsamplestested"]);
              if ((value["" + j + ""]["totalsamplestested"]) != "") {
                totalindividualstested = totalindividualstested + parseInt(value["" + j + ""]["totalsamplestested"]);
              }
            }
            for (let k = 0; k < value.length; k++) {
              //console.log(value["" + k + ""]["totalsamplestested"]);
              if ((value["" + k + ""]["totalsamplestested"]) != "") {
                sample = sample + parseInt(value["" + k + ""]["totalsamplestested"]);
              }
              if((k%15) == 0){
                this.lineChartData3[0]["data"].push(sample);
              }
            }
          }
        }
        //console.log("totalconfirmed", totalconfirmed, "totaldeceased", totaldeceased, "totalrecovered", totalrecovered, "active", active, "totalindividualstested", totalindividualstested);
        this.country_wise.push(totalconfirmed, totaldeceased, totalrecovered, active, totalindividualstested);
        //console.log(this.country_wise);
      })
    }).catch((err) => {
      console.log("Error generated:", err);
    });
  }
}
