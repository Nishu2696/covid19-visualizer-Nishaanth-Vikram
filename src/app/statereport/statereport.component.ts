import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-statereport',
  templateUrl: './statereport.component.html',
  styleUrls: ['./statereport.component.css']
})
export class StatereportComponent implements OnInit {

  currentId;
  posts = [];
  country = [];
  state_wise = [];
  country_wise = [];
  district = [];

  constructor(
    private _state: StateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this._state.getData().then((response) => {
      response.json().then((data) => {
        this.posts = data;
        for(let i=0; i < this.posts.length; i++){
          if( i == this.currentId){
            let con_case;
            let confirmed = 0;
            let dec_case;
            let deceased = 0;
            let act_case;
            let active = 0;
            let rec_case;
            let recovered = 0;
            let district_name;
            let district_keys = Object.keys(this.posts[i]);
            for(let j=0; j < district_keys.length; j++){
              if((district_keys[j]) == "districtData"){
                let value = this.posts[i][district_keys[j]];
                //console.log("value", value);
                for( let k=0; k < value.length; k++){
                  let state = [];
                  district_name = value[k]["district"];
                  con_case = value[k]["confirmed"];
                  confirmed = confirmed + parseInt(value[k]["confirmed"])
                  dec_case = value[k]["deceased"];
                  deceased = deceased + parseInt(value[k]["deceased"]) 
                  act_case = value[k]["active"];
                  active = active + parseInt(value[k]["active"])
                  rec_case = value[k]["recovered"];
                  recovered = recovered + parseInt(value[k]["recovered"]);
                  state.push(district_name, con_case, dec_case, act_case, rec_case);
                  this.state_wise.push(state);
                }
                this.country_wise.push(confirmed, deceased, active, recovered);
              }
            }
          }
          //console.log(this.state_wise);
        }
        /*for (let key of Object.keys(this.posts)) {
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
        }*/

      });
    }).catch((err) => {
      console.log("Error generated:", err);
    });
  }

}
