import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, merge, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap, takeUntil, take } from 'rxjs/operators';
import { CrewService } from '../../../shared/core/service/crew.service';
import { ActivatedRoute, Router } from '@angular/router';

// import { Tender } from '../../shared/core/model/tender.model';
import { TenderItem } from '../../../shared/core/model/tender-item.model';
import * as uuid from 'uuid';
import { CrewModalComponent } from 'app/shared/components/crew-modal/crew-modal.component';
import { NotifySubcontractorComponent } from 'app/shared/components/notify-subcontractor/notify-subcontractor.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { isArray } from 'util';
import { HttpService } from '../../../shared/core/service/http.service';
import { HelperService } from '../../../shared/core/service/helper.service';
//
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';

@Component({
    selector: 'app-view-tender',
    templateUrl: './view-tender.component.html',
    styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit {

    // @ViewChild(TenderItemComponent, { static: false }) tender_item_c: TenderItemComponent;

    accordion = {};
    crews = {}
    model: any;
    searching = false;
    searchFailed = false;
    states = [];
    lineItems: any = [];
    //
    tenderID: any;
    sections = [];
    loadedSections = [];

    responseData: any;
    //
    notifiedSubList: any;
    notifiedSubIds = [];    // for temporarily storing heder level notified subs IDS
    selectedVal: any;
    //
    constructor(private activatedRoute: ActivatedRoute,
        private router: Router, public dialog: MatDialog, private hs: HelperService,
        private httpServ: HttpService, private spinner: NgxSpinnerService,
        public sectionModalDialog: MatDialog, private toastr: ToastrService) {
        //
        this.activatedRoute.params.subscribe((params) => {
            // console.log('view tender params ', window.history.state);
            const paramData = window.history.state;
            this.tenderID = paramData._id;
            // console.log('param data .. ', paramData);
            this.notifiedSubIds = paramData['headerLevelNotifiedSubs'];
            // this.modifyNotifiedSubList();
            this.setDataforQuotePage(paramData);
            //
            return;
        }

        
        )
    }



    subSelection(subCont) {
        console.log(subCont);
        this.selectedVal = subCont;
    }

    setDataforQuotePage(data) {
        // delete data.createdAt;
        // delete data.updatedAt;
        // delete data.headerLevelNotifiedSubs;
        delete data.navigationId;
        this.responseData = data;
    }
    //
    ngOnInit() {
        // remove 'hs.setDataInHelperSrv()' in final build as this will be invoked from login
        this.hs.setDataInHelperSrv();
        this.modifyNotifiedSubList();
    }
    //
    back() {
        this.router.navigateByUrl('/tender');
    }
    //
    notifySubC() {
        //
        const dialogRef = this.dialog.open(NotifySubcontractorComponent, {
            height: '50%',
            width: '850px',
            data: { tenderID: this.tenderID },
            disableClose: true
        });
        //
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ', result);
            this.getTenderByID();
        });
    }
    //
    getTenderByID() {
        // console.log('getTenderByID invoked ');
        this.httpServ.getTenderDetailById(this.tenderID).subscribe((response) => {
            // console.log('success getTenderDetailById ', response);
            if (response.status === 200) {
                // console.log('success getTenderDetailById ', response.status);
                this.hs.updateLocalTenderListByID(response.body);
                this.notifiedSubIds = response.body['headerLevelNotifiedSubs'];
                console.log('fffffff' ,this.notifiedSubIds);
                this.modifyNotifiedSubList();
                this.responseData = response.body;
                // this.toastr.success('Selected Sub Contractors have been notified.');
            }
        },
            (err) => {
                console.log('Error getting Tender by id ', err);
            })
    }

    private modifyNotifiedSubList() {
        if (this.notifiedSubIds.length <= 0) {
            return;
        }
        const subContList = this.hs.getSubContractorList();
        this.notifiedSubList = [];
        this.notifiedSubIds.forEach(element => {
            const sc = subContList.find(item => item._id === element);
            this.notifiedSubList.push(sc);
        });
        this.notifiedSubIds = [];
        console.log('notifiedSubList  ', this.notifiedSubList);
    }
    viewer(item) {
        this.router.navigateByUrl('/pdf-viewer/' + item.id);
    }
}
// End of class


