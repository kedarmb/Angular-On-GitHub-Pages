import { Component, OnInit } from '@angular/core';
import {TenderService} from '../service/tender.service';
import {Tender} from '../model/tender.model';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  tender: Tender;
  contractor = true;
  constructor(private tenderService: TenderService) { }


  ngOnInit() {
     this.tenderService.getTenderById('123').subscribe((tender) => {
        this.tender = tender;
     })
  }

  contractorWise() {
    this.contractor = true;
  }

  lineItemWise() {
    this.contractor = false;
  }

}
