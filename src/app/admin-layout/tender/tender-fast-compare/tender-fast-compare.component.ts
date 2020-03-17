import { ViewQuotesComponent } from './../../../shared/components/view-quotes/view-quotes.component';
import { MatDialog } from '@angular/material';
import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from './../../../shared/core/service/http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tender-fast-compare',
  templateUrl: './tender-fast-compare.component.html',
  styleUrls: ['./tender-fast-compare.component.scss']
})
export class TenderFastCompareComponent implements OnInit {
  tenderId: any;
  sublineData: any = [];
  _selectedSubs = [];
  fromGet = false;
  constructor(
    private router: Router,
    private hs: HelperService,
    private httpService: HttpService,
    public fastCompareDialog: MatDialog,
    public toastr:ToastrService,
    public spinner:NgxSpinnerService
  ) {
    this.tenderId = JSON.parse(this.hs.getSession('tenderIdNow'));
    console.log(this.tenderId);
  }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.spinner.show();
    this.httpService.getUniqueSubline(this.tenderId).subscribe(
      response => {
        this.spinner.hide();
        if (response.status === 201) {
          // this.toastr.success('successfully saved  subline items');
          const _sublineData = response.body as Array<any>;
          this.sublineData = _sublineData.sort((a, b) => {
            var nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase();
              if (nameA < nameB)
              //sort string ascending
              return -1;
              if (nameA > nameB) return 1;
              return 0; //default return value (no sorting)
            });
          _sublineData.forEach(val => {
            val.quotes.sort((a, b) => {
              return a.unitPrice - b.unitPrice;
            });
          });
          console.log(this.sublineData);
          this.fromGet = true;
        }
      },
      err => {
        this.toastr.success('error getting  subline items');
        this.spinner.hide();
        console.log('Error getting subline items ', err);
      }
    );
  }

  selectQuote(val) {
    console.log(val)
    this.sublineData.map(e => {
      if (val.q.value._id == e._id) {
        console.log('true')
        e.quotes.map(f => {
          f.selected = false;
          if (f.subContractorId._id == val.qId) {
            f.selected = true;
            console.log(f.selected);
          }
        });
      }
    });
  }

  getSelectedResults(val) {
    console.log(val);
  }

  moreQuotes() {
    const update = {
      quotes: this.sublineData
    };
    console.log(update);
    this.openMoreQuotesDialog(update);
  }

  openMoreQuotesDialog(data) {
    const dialogRef = this.fastCompareDialog.open(ViewQuotesComponent, {
      width: '550px',
      data: data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response.status === 'close' || response.status === undefined) {
      }
      if (response.status === 'add') {
      }
      if (response.status === 'update') {
        console.log(response);
        this.sublineData = response.data;
      }
    });
  }

  save() {
    this.spinner.show();
    let _selectedSub = [];
    let _deSelectedSub = [];
    for (let i of this.sublineData) {
      for (let e of i.quotes) {
        if (e.selected == false) {
          _deSelectedSub.push(e);
        }
        if (e.selected == true) {
          _selectedSub.push(e);
        }
      }
    }
    const selectedSub = _selectedSub.map(selSubId => selSubId.sublineItemId);
    const deSelectedSub = _deSelectedSub.map(deselSubId => deselSubId.sublineItemId);
    
    const sublineItemIds = {
      deSelectedSub: deSelectedSub,
      selectedSub: selectedSub
    };
    console.log(sublineItemIds);
    this.httpService.updateseletedDeselectSub(sublineItemIds, this.tenderId).subscribe(
      response => {
        this.spinner.hide();
        this.toastr.success('successfully saved compared results')
        if (response.status === 200) {
          console.log(response);
        }
      },
      err => {
        this.spinner.hide();
        this.toastr.success('Error saving compared results');
        console.log('Error saving compared results ', err);
      }
    );
  }

  continueToMatch() {
    this.router.navigate(['/fast-attach/' + this.tenderId], {
      state: this.tenderId
    });
  }

  cancel() {
    this.router.navigate(['/fast-list/' + this.tenderId]);
  }
}
