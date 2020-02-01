import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'app/shared/core/service/http.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-tender-compare',
  templateUrl: './tender-compare.component.html',
  styleUrls: ['./tender-compare.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenderCompareComponent implements OnInit {
  lineTotal: any;
  selection;
  tenderCompare;
    displayedColumns: string[] = ['select', 'SubContractor', 'unitPrice', 'totalPrice'];
  constructor( private httpService: HttpService) {

    this.getAllTenders();
  }

  ngOnInit() {
    console.log(this.tenderCompare);
    // this.fetchLineTotal();
  }
  fetchLineTotal(sec, lt, slt) {
    this.lineTotal = this.tenderCompare.sections[sec].lineItems[lt].lineItemTotal.filter(val => val.quoteSub === slt)
    console.log(this.lineTotal);
  }

  getAllTenders() {
    return this.httpService.getTenders().subscribe((response) => {
      if (response.status === 200) {
        this.tenderCompare = response.body;
        console.log(this.tenderCompare)
      }
    }, (error) => {
      console.log('err in fetching tender headers ', error);
    })
  }
}
