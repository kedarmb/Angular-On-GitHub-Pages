import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from 'app/shared/core/service/http.service';
import { PlatformLocation } from '@angular/common';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tender-fast-attach',
  templateUrl: './tender-fast-attach.component.html',
  styleUrls: ['./tender-fast-attach.component.scss']
})
export class TenderFastAttachComponent implements OnInit {
  tenderId: any;

  constructor(private router: Router, private hs: HelperService,
    private httpService: HttpService, private location: PlatformLocation,
    public fastCompareDialog: MatDialog) {
    this.tenderId = JSON.parse(this.hs.getSession('tenderIdNow'))
    console.log(this.tenderId);
    location.onPopState((e) => {
      if (e.type === 'popstate') {
        this.router.navigate(['/fast-compare/' + this.tenderId]);
      }
    });
  }

  ngOnInit() {

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
}
