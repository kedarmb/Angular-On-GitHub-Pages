import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchSubscriberService} from '../service/search-subscriber.service';

@Component({
  selector: 'app-medical-comprehend',
  templateUrl: './medical-comprehend.component.html',
  styleUrls: ['./medical-comprehend.component.scss']
})
export class MedicalComprehendComponent implements OnInit {

  results = [];
  text="";

  constructor(private httpClient: HttpClient, private searchSubsciberService: SearchSubscriberService) {
      this.searchSubsciberService.get().subscribe((text)=>{
          console.log('*****************************************',text);
          this.text=text;
      })
  }

  ngOnInit() {

  }

  submit() {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',this.text);
    this.httpClient.post('https://rt7ynesqck.execute-api.us-east-1.amazonaws.com/dev/api/speech',
        {'text': this.text}).subscribe((results: any) => {

          this.results = results.result.Entities;
    }, () => {}, () => {

    })
  }

}
