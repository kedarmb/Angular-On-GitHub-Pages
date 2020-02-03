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
import { MatSelect } from '@angular/material';
//
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';
import { SectionModalComponent } from '../../../shared/components/section-modal/section-modal.component';
import { TenderItemComponent } from './tender-item/tender-item.component'
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
    selectedVal: any;
    /* foods = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ]; */

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router, public dialog: MatDialog,
        private httpServ: HttpService, private spinner: NgxSpinnerService,
        public sectionModalDialog: MatDialog) {
        //
        this.activatedRoute.params.subscribe((params) => {
            // console.log('view tender params ', window.history.state);
            const paramData = window.history.state;
            this.tenderID = paramData._id;
            console.log('view tenderID ', this.tenderID);
            this.getNotifiedSubsList();
            this.setDataforQuotePage(paramData);
            // this.fetchInitialSections();
            /// this.fetchSingleTender();
            return;
        })
    }
    getNotifiedSubsList() {
        this.httpServ.getNotifiedSubs(this.tenderID).subscribe((res) => {
            console.log('getNotifiedSubs success', res);
            if (res.status === 200) {
                this.notifiedSubList = res.body['headerLevelNotifiedSubs'];
            }
        },
            (err) => {
                console.log('getNotifiedSubs err', err);
            })
    }

    subSelection(subCont) {
        console.log(subCont);
        this.selectedVal = subCont;
    }

    setDataforQuotePage(data) {
        // delete data.createdAt;
        // delete data.updatedAt;
        delete data.navigationId;
        // delete data.headerLevelNotifiedSubs;
        console.log(data)
        this.responseData = data;
    }

    /** Fetch tender detail <new schema> by ID  */
    /* fetchSingleTender() {
        this.spinner.show();
        this.httpServ.fetchSingleTenderById(this.tenderID).subscribe((response) => {
            this.spinner.hide();
            if (response.status === 200) {
                //
                const rawData = Object.assign({}, response.body);
                delete rawData.headerLevelNotifiedSubs;
                delete rawData.itemRef;
                delete rawData.sectionRef;
                delete rawData.createDate;
                delete rawData.updateDate;
                delete rawData.createdDate;
                delete rawData.updatedDate;
                delete rawData.__v;
                //
                this.responseData = rawData;
                // console.log('print id:  ');
                // this.responseData.map(item => console.log(item._id));
            }
        },
            (err) => {
                this.spinner.hide();
                console.log('fetchSingleTenderById .. ', err);
            })
    } */

    ngOnInit() {
        //
    }
    //
    back() {
        this.router.navigateByUrl('/tender');
    }
    //
    notify() {
        //
        const dialogRef = this.dialog.open(NotifySubcontractorComponent, {
            height: '50%',
            width: '850px'/* ,
            data: { name: this.name, animal: this.animal } */
        });
        //
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ', result);
        });
    }
    // saving the form as is - even incomplete
    saveUnfilteredTender() {

    }
    viewer(item) {
        this.router.navigateByUrl('/pdf-viewer/' + item.id);
    }
}
// End of class


