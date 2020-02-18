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
    this.getQuotes()
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
  moreQuotes() {
    const update = {}
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
      }
    });
  }
  cancel() {
    this.router.navigate(['/fast-list/' + this.tenderId]);
  }
}
