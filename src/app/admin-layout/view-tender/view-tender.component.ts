import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, merge, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap, takeUntil, take } from 'rxjs/operators';
import { CrewService } from '../../shared/core/service/crew.service';
import { ActivatedRoute, Router } from '@angular/router';

// import { Tender } from '../../shared/core/model/tender.model';
import { TenderItem } from '../../shared/core/model/tender-item.model';
import * as uuid from 'uuid';
import { CrewModalComponent } from 'app/shared/components/crew-modal/crew-modal.component';
import { NotifySubcontractorComponent } from 'app/shared/components/notify-subcontractor/notify-subcontractor.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { isArray } from 'util';
import { HttpService } from '../../shared/core/service/http.service';
import { MatSelect } from '@angular/material';
//
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import _ from 'lodash';
import { SectionModalComponent } from '../../shared/components/section-modal/section-modal.component';
import { TenderItemComponent } from './tender-item/tender-item.component'
@Component({
    selector: 'app-view-tender',
    templateUrl: './view-tender.component.html',
    styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit {

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
            // this.fetchInitialSections();
            this.fetchSingleTender();
            return;
        })
    }
    /** Fetch tender detail <new schema> by ID  */
    fetchSingleTender() {
        this.spinner.show();
        this.httpServ.fetchSingleTenderById(this.tenderID).subscribe((response) => {
            this.spinner.hide();
            if (response.status === 200) {
                //
                const rawData = Object.assign({}, response.body);
                delete rawData.itemRef;
                delete rawData.sectionRef;
                delete rawData.createDate;
                delete rawData.updateDate;
                delete rawData.createdDate;
                delete rawData.updatedDate;
                delete rawData.__v;
                //
                this.responseData = rawData;
                // console.log(this.responseData);
            }
        },
            (err) => {
                this.spinner.hide();
                console.log(err);
            })
    }

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
            width: '350px'/* ,
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


