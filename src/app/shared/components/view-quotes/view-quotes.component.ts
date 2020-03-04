import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-view-quotes',
  templateUrl: './view-quotes.component.html',
  styleUrls: ['./view-quotes.component.scss']
})
export class ViewQuotesComponent implements OnInit {
  resData = {
    status: '',
    data: []
  };
  quotes
  filteredQuote = [];
  _selectedSubs = [];

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() private dialogRef: MatDialogRef<any>) {
    this.quotes =  data.quotes;
  }

  ngOnInit() {

  }

  selectQuote(val, quote) {
    for (let i of this.quotes) {
      if (quote._id == i._id) {
        for (let j of i.quotes) {
          j.selected = false;
          if (j.subContractorId._id == val) {
            j.selected = true;
          }
        }
      }
    }
    console.log(this.quotes)
    }

  showQuote(q) {
    this.filteredQuote = this.quotes.filter(val => val._id === q)
  }
  save() {
    console.log(this.quotes)
    this.resData.status = 'update';
    this.resData.data = this.quotes;
    this.dialogRef.close(this.resData);

  }
  close() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
  }
}
