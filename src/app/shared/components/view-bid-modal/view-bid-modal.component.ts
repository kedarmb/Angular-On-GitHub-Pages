import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy,ViewChild,QueryList,AfterViewInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bid-modal',
  templateUrl: './view-bid-modal.component.html',
  styleUrls: ['./view-bid-modal.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenderBidHelperComponent implements OnInit {
  
    constructor(private httpService: HttpService,
       private router: Router,
        private hs: HelperService,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any
        ) {

    }

    ngOnInit() {
    console.log(this.data.item.specNo)      
    }

 
}
