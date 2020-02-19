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
    this.quotes = this.data.quotes;
    this._selectedSubs = this.data.selected;
    console.log(this._selectedSubs);
  }

  ngOnInit() {
  }

  checkIfSelected(val) {
    let ifSelected = false;
    // console.log(val);
    for (let i = 0; i < this._selectedSubs.length; i++){
      if (this._selectedSubs[i].sId === val.sublineItemId){
        ifSelected = true;
        break
      }
    }
    return ifSelected;
  }


  getQuote($event, quote, item) {
    console.log(item);
    const temp = {
      qId: item._id,
      sId: quote.sublineItemId
    }

    for (let i = 0; i < this._selectedSubs.length; i++) {
      if (this._selectedSubs[i].qId === item._id) {
        // console.log('poped q id');
        this._selectedSubs.splice(i, 1);
        break;
      }
    }
    this._selectedSubs.push(temp);
    console.log(this._selectedSubs);
  }

  showQuote(q) {
    this.filteredQuote = this.quotes.filter(val => val._id === q)
  }
save(){
  this.resData.status = 'update';
  this.resData.data = [...this._selectedSubs];
  this.dialogRef.close(this.resData);

}
  close() {
    this.resData.status = 'close';
    this.dialogRef.close(this.resData);
  }
}
