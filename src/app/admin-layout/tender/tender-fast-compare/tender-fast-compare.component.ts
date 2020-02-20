import { ViewQuotesComponent } from './../../../shared/components/view-quotes/view-quotes.component';
import { MatDialog } from '@angular/material';
import { PlatformLocation } from '@angular/common';
import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from './../../../shared/core/service/http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender-fast-compare',
  templateUrl: './tender-fast-compare.component.html',
  styleUrls: ['./tender-fast-compare.component.scss']
})
export class TenderFastCompareComponent implements OnInit {
  tenderId: any;
  sublineData: Object;
  _selectedSubs = [];

  constructor(private router: Router, private hs: HelperService,
    private httpService: HttpService, private location: PlatformLocation,
    public fastCompareDialog: MatDialog) {
    // this.tenderData = this.router.getCurrentNavigation().extras.state;
    this.tenderId = JSON.parse(this.hs.getSession('tenderIdNow'))
    console.log(this.tenderId);
    location.onPopState((e) => {
      if (e.type === 'popstate') {
        this.router.navigate(['/fast-list/' + this.tenderId]);
      }
    });
  }

  ngOnInit() {
    this.getQuotes();
    this.getSelectedSubline();
  }

  getQuotes() {
    this.httpService.getUniqueSubline(this.tenderId).subscribe((response) => {
      if (response.status === 201) {
        this.sublineData = response.body;
        console.log(this.sublineData)
      }
    },
      (err) => {
        console.log('Error getting Tender by id ', err);
      })
  }

  getQuote(e, quote, item) {
    const temp = {
      qId: item.value._id,
      sId: quote.value.sublineItemId
    }
    for (let i = 0; i < this._selectedSubs.length; i++) {
      if (this._selectedSubs[i].qId === item.value._id) {
        console.log('poped q id');
        this._selectedSubs.splice(i, 1);
        break;
      }
    }
    this._selectedSubs.push(temp);
  }

  checkIfSelected(val) {
    let ifSelected = false;
    for (let i = 0; i < this._selectedSubs.length; i++) {
      if (this._selectedSubs[i].sId === val.value.sublineItemId) {
        ifSelected = true;
        break
      }
    }
    return ifSelected;
  }

  getSelectedSubline() {
    this.httpService.getselectedsubline(this.tenderId).subscribe((response) => {
      if (response.status === 201) {

        console.log(response.body)
      }
    },
      (err) => {
        console.log('Error getting Tender by id ', err);
      })
  }

  moreQuotes() {
    const update = { selected: [...this._selectedSubs], quotes: this.sublineData }
    this.openMoreQuotesDialog(update)
  }
  openMoreQuotesDialog(data) {
    const dialogRef = this.fastCompareDialog.open(ViewQuotesComponent, {
      width: '550px',
      data: data,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
      }
      if (response.status === 'add') {
      }
      if (response.status === 'update') {
        console.log(response)
        this._selectedSubs = response.data;
      }
    });
  }
  save() {
    const finalVal = this._selectedSubs.map((val) => {
      return val.sId
    })
    const sublineItemIds = {
      sublineItemIds: finalVal
    }
    console.log(sublineItemIds)
    this.httpService.updateSubline(sublineItemIds, this.tenderId).subscribe((response) => {
      if (response.status === 200) {
        console.log(response)
      }
    },
      (err) => {
        console.log('Error getting Tender by id ', err);
      })
  }
  cancel() {
    this.router.navigate(['/fast-list/' + this.tenderId]);
  }
}
