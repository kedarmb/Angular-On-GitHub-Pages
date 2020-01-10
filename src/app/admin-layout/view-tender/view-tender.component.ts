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
import {TenderItemComponent} from './tender-item/tender-item.component'
@Component({
    selector: 'app-view-tender',
    templateUrl: './view-tender.component.html',
    styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit, AfterViewInit, OnDestroy {

    accordion = {};

    crews = {}

    trench = {
        beading: {
            length: 0,
            height: 0,
            width: 0,
            boxVolume: 0,
            diameter: 0,
            pipeVolume: 0,
            density: 0,
            weight: 0
        },
        backfill: {
            height: 0,
            width: 0,
            length: 0,
            boxVolume: 0,
            density: 0,
            weight: 0
        }
    }

    // tender: Tender = new Tender();
    model: any;
    searching = false;
    searchFailed = false;
    states = [];
    /* displayedColumns: string[] = ['ItemNo', 'SpecNo', 'ItemName', 'Description',
        'Unit', 'Unit-Price', 'Quantity', 'TotalPrice'];*/
    lineItems: any = [];

    //
    tenderID: any;
    sections = [];
    loadedSections = [];
    public sectionMultiCtrl: FormControl = new FormControl();

    /** control for the MatSelect filter keyword multi-selection */
    public multiFilterCtrl: FormControl = new FormControl();

    /** list of sections filtered by search keyword */
    public filteredSectionsMulti: ReplaySubject<any> = new ReplaySubject<any>(1);

    @ViewChild('multiSelect', { static: false }) multiSelectWidget: MatSelect;
    widgetRef: any;

    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();

    focus$ = new Subject<string>();
    click$ = new Subject<string>();
    //


    constructor(private crewService: CrewService,
        private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
        private router: Router, public dialog: MatDialog,
        private httpServ: HttpService, private spinner: NgxSpinnerService,
        public sectionModalDialog: MatDialog, private toastr: ToastrService,
        private changeDetector: ChangeDetectorRef) {
        //
        this.activatedRoute.params.subscribe((params) => {
            console.log('view tender params ', params);
            this.tenderID = params.id;
            this.fetchInitialSections();
            return;
            /* */

            // console.log('param ', params);
            // this.tenderService.getTenderById

            // this.httpServ.getTenderDetailById(params.id).subscribe((tender) => {
            //     console.log('Success fetching tender details ', tender)
            // console.log(tender);
            // ********************************** */
            // this.lineItems = tender.items;
            // console.log(this.lineItems);
            // this.tender = JSON.parse(JSON.stringify(tender));
            // // this.createLineItemFormGroup();
            // this.getMasterForm();
            // this.createLineItemForm();

            // console.log(this.masterForm);
            // ********************************** */
            // this.createSubcontractorControls();

            //     }, (err) => {
            //         console.log('Error fetching tender details ', err);
            //     })
        })
    }

    fetchInitialSections() {
        this.spinner.show();
        this.httpServ.getSections().subscribe((res) => {
            console.log('success fetching seactions ', res);
            this.sections = res.body as Array<any>;
            console.log(this.sections);
            // load the initial bank list
            this.spinner.hide();
            this.filteredSectionsMulti.next(this.sections.slice());
        }, (err) => {
            this.spinner.hide();
            console.log('error fetching sections ', err);
        })
    }
    ngOnInit() {
        // listen for search field value changes
        this.multiFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filtersectionsMulti();
            });

        this.sectionMultiCtrl.valueChanges.subscribe(val => this.widgetRef = val)
    }

    ngAfterViewInit() {
        console.log('multiSelectWidget is ', this.multiSelectWidget)
        this.setInitialValue();
    }

    ngOnDestroy() {
        console.log(this.multiSelectWidget)
        this._onDestroy.next();
        this._onDestroy.complete();
    }


    onSectionSelect() {
        console.log('selection event captured ');
        //
        // console.log(this.sectionMultiCtrl.value);



        const diff = _.difference(this.sectionMultiCtrl.value, this.loadedSections);
        if (diff[0]) {
            const id = diff[0]._id;
            console.log(diff, id);
            this.spinner.show();
            this.httpServ.getLineItems(id).subscribe((data) => {
                console.log('success fetching lineitems ', data);
                if (data.status === 200) {
                    this.lineItems = data.body;
                    this.spinner.hide();
                    this.changeDetector.detectChanges();
                    this.widgetRef = this.multiSelectWidget;
                    this.multiSelectWidget.close();
                }

            }, (err) => {
                console.log('failed to load line items ', err);
                this.spinner.hide();
            })

        }
        console.log('form selection changed');
        // to load line items-

    }
    //
    addSection() {
        // this
        const dialogRef = this.sectionModalDialog.open(SectionModalComponent, {
            width: '550px',
            data: this.tenderID,
            disableClose: true
        })
        //
        dialogRef.afterClosed().subscribe(response => {
            console.log('The dialog was closed ', response);
            // con
            if (response.status === 'close' || response.status === undefined) {
                this.toastr.warning('Section creation cancelled.', 'Cancelled');
            }
            if (response.status === 'add') {
                console.log(response.data);
                // response.data.clientName = this.hs.findClientName(response.data.clientName);
                // this.sections.push(response.data);
                // this.sectionMultiCtrl.setValue(response.data);
                this.fetchInitialSections();
            }
            if (response.status === 'update') {
                console.log(response.data);
                // this.getAllTenders();

            }
        })
    }
    //
    fetchLineItemsById() {

    }

    /**
   * Sets the initial value after the filteredsections are loaded initially
   */
    protected setInitialValue() {

        this.filteredSectionsMulti
            .pipe(take(1), takeUntil(this._onDestroy))
            .subscribe(() => {
                // setting the compareWith property to a comparison function
                // triggers initializing the selection according to the initial value of
                // the form control (i.e. _initializeSelection())
                // this needs to be done after the filteredsections are loaded initially
                // and after the mat-option elements are available
                if (this.multiSelectWidget) {
                    console.log(this.sections)
                    this.multiSelectWidget.compareWith = (a, b) => {
                        console.log(this.multiSelectWidget)
                        console.log(a, b);
                        return a && b && a.tenderRef === b.tenderRef;
                    }
                }

            });
    }

    protected filtersectionsMulti() {

        if (!this.sections) {
            return;
        }
        // get the search keyword
        let search = this.multiFilterCtrl.value;
        if (!search) {
            this.filteredSectionsMulti.next(this.sections.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the sections
        this.filteredSectionsMulti.next(
            this.sections.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
        );
    }
    /* getMasterForm() {
        // console.log()
        this.masterForm = this.formBuilder.group({
            items: this.formBuilder.array([])
            // this.formBuilder.array([this.generateLineItemsControls()])
        })
    } */

    /* createLineItemForm() {
        this.tender.items.forEach((item, index) => {
            const lineItemFormArr = this.masterForm.get('items') as FormArray;
            lineItemFormArr.push(this.createItemCtrl(item));
            //
            item.subitems.forEach((subItem, subItemIndex) => {
                // console.log((<FormArray>lineItemFormArr.controls[index].get('subcontractors')));
                const subItemNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('subitems'))
                //
                subItemNode.push(this.createSublineItemsCtrls(subItem));
                //
            })

            // item.equipments.forEach((equipment, equipIndex) => {
            //     const equipmentNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('equipments'));
            //     equipmentNode.push(this.createEquipmentControls(equipment))
            // })
            //
            // item.labours.forEach((labour, labourIndex) => {
            //     const labourNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('labours'));
            //     labourNode.push(this.createLaboursControls(labour));
            // })
        })
        // console.log(this.masterForm)
        this.masterForm.get('items')['controls'].map((item) => {
            // console.log(item)
            // item.get('equipments')['controls'].map(eq => {
            //     // console.log(eq)
            // },
            //     item.get('subcontractors')['controls'].map(sub => {
            //         // console.log(sub)
            //         // console.log(item)
            //         sub.get('subitems')['controls'].map(subItem => {
            //             //
            //         })
            //     })
            // )
        }
        )
    } */




    /* createItemCtrl(element) {
        return this.formBuilder.group({
            itemNo: [element.itemNo],
            specNo: [element.specNo],
            itemName: [element.itemName],
            description: [element.description],
            unit: [element.unit],
            unitPrice: [element.unitPrice],
            quantity: [element.quantity],
            totalPrice: [element.totalPrice],
            // trench: [element.trench],
            subitems: this.formBuilder.array([])
            // subcontractors: this.formBuilder.array([]),
            // equipments: this.formBuilder.array([]),
            // labours: this.formBuilder.array([])
        })
    }

    createSublineItemsCtrls(element) {
        return this.formBuilder.group({
            id: [element.id],
            name: [element.name],
            unit: [element.unit],
            unitPrice: [element.unitPrice],
            quantity: [element.quantity],
            totalPrice: [element.totalPrice]
        })
    } */
    //
    /* createSubContCtrls(element) {
        // console.log('createSubContCtrls', element);
        return this.formBuilder.group({
            name: [element.name],
            subitems: this.formBuilder.array([])
        })
    } */
    /* createSubItemsCtrls(element) {
        return this.formBuilder.group({
            id: [element.id],
            name: [element.name],
            quantity: [element.quantity],
            unit: [element.unit],
            unitPrice: [element.unitPrice],
            totalPrice: [element.totalPrice]
        })
    } */

    /* createEquipmentControls(element) {
        return this.formBuilder.group({
            // _id: [element._id],
            name: [element.name],
            description: [element.description],
            rate: [element.rate],
            type: [element.type]
        })

    } */

    /* createLaboursControls(element) {
        return this.formBuilder.group({
            // _id: [element._id],
            name: [element.name],
            description: [element.description],
            rate: [element.rate],
            type: [element.type],
            // createdAt: [element.createdAt]
        })
    } */




    /* trench(item) {
         const modalRef = this.modalService.open(TrenchModalComponent, {centered: true});
     }*/
    back() {
        this.router.navigateByUrl('/tender');
    }

    crew(item) {
        // const modalRef = this.modalService.open(CrewModalComponent, { centered: true, size: 'lg' });
    }

    toggleCollapse(index) {
        console.log('indx is ', index);
        this.accordion[index] = !this.accordion[index]
    }

    /* delete(item) {
        this.tender.items = this.tender.items.filter((v) => {
            if (v.id === item.id) {
                return false;
            } else {
                return true;
            }
        })
    } */

    /* add() {
        const tenderItem = new TenderItem();
        tenderItem.id = uuid.v4();
        this.tender.items.unshift(tenderItem);
    } */

    /* addLineItem() {
        const subIlineItm = {
            id: '',
            name: '',
            unit: '',
            unitPrice: '',
            quantity: '',
            totalPrice: ''
        }
        //
        const lineItm = this.formBuilder.group({
            itemNo: [],
            specNo: [],
            itemName: [],
            description: [],
            unit: [],
            unitPrice: [],
            quantity: [],
            totalPrice: [],
            subitems: this.formBuilder.array([this.createSublineItemsCtrls(subIlineItm)])
        });
        //
        const lineItemsArr = this.masterForm.get('items') as FormArray;
        lineItemsArr.insert(0, lineItm);
    }
    //
    save() {
        if (this.tender._id) {
            this.tenderService.update(this.tender).subscribe(() => {
                this.tenderService.getTenderById(this.tender._id).subscribe((tender) => {
                    // this.tender = tender;
                })
            })
        } else {
            this.tenderService.add(this.tender).subscribe(() => {
                this.tenderService.getTenderById(this.tender._id).subscribe((tender) => {
                    // this.tender = tender;
                })
            })
        }

    } */

    /* addSubitem(item) {
        item.subitems.unshift({ name: '', unitPrice: 0, quantity: 0, totalPrice: 0 });
    } */
    addSubLineItem(param) {
        // const subItemNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('subitems'))
        const sbGroup = this.formBuilder.group({
            id: '',
            name: '',
            unit: '',
            unitPrice: '',
            quantity: '',
            totalPrice: ''
        })
        //
        const subItemsArr = param.get('subitems').controls as Array<any>;
        // subItemsArr.push(sbGroup);
        // subItemsArr.insert(0, sbGroup);
        subItemsArr.unshift(sbGroup);
    }

    removeSublineItem(param, index) {
        const subItemsArr = param.get('subitems').controls as Array<any>;
        subItemsArr.splice(index, 1);
    }

    public searchFunctionFactory(instance: any): (text: Observable<string>) => Observable<any[]> {
        const getCities = (text$: Observable<string>) => {
            const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
            const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !instance.isPopupOpen()));
            const inputFocus$ = this.focus$;

            return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
                map(term => (term === '' ? this.states
                    : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
            )
        }


        return getCities;
    }

    selectedItem(event, item) {
        item.equipments = this.crews[event.item] ? this.crews[event.item].equipments : [];
        item.labours = this.crews[event.item] ? this.crews[event.item].labours : [];
    }


    notify() {
        // const modalRef = this.modalService.open(NotifySubcontractorComponent, { centered: true });
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

    populateCrew(item) {
        this.crewService.getCrewByName(item.crew).subscribe((crew) => {
            if (crew) {
                item.equipments = crew.equipments;
                item.labours = crew.labours;
            }

        })
    }

    calculateTrench() {

        if (isNaN(this.trench.backfill.length)) {
            this.trench.backfill.length = 0;
        }
        if (isNaN(this.trench.backfill.height)) {
            this.trench.backfill.height = 0;
        }
        if (isNaN(this.trench.backfill.width)) {
            this.trench.backfill.width = 0;
        }
        if (isNaN(this.trench.backfill.density)) {
            this.trench.backfill.density = 0;
        }
        if (isNaN(this.trench.beading.width)) {
            this.trench.beading.width = 0;
        }

        if (isNaN(this.trench.beading.height)) {
            this.trench.beading.height = 0;
        }
        if (isNaN(this.trench.beading.length)) {
            this.trench.beading.length = 0;
        }

        if (isNaN(this.trench.beading.density)) {
            this.trench.beading.density = 0;
        }
        if (isNaN(this.trench.beading.diameter)) {
            this.trench.beading.diameter = 0;
        }

        this.trench.backfill.boxVolume = Math.floor((this.trench.backfill.length *
            this.trench.backfill.height *
            this.trench.backfill.width));
        this.trench.backfill.weight = Math.floor(this.trench.backfill.density * this.trench.backfill.boxVolume);
        this.trench.beading.boxVolume = Math.floor((this.trench.beading.length * this.trench.beading.height * this.trench.beading.width));
        this.trench.beading.pipeVolume = Math.floor((3.14 * (this.trench.beading.diameter / 2) * this.trench.beading.height));
        const remaningVolume = this.trench.beading.boxVolume - this.trench.beading.pipeVolume;
        this.trench.beading.weight = Math.floor(remaningVolume * this.trench.beading.density);


    }
    viewer(item) {
        this.router.navigateByUrl('/pdf-viewer/' + item.id);
    }
    // addSection() {
    //     this.sections.push({ name: 'Enter Section Name' });
    // }
}


/*
initilizeMasterForm() {
        this.masterForm = this.formBuilder.group({
            // First define the page level single form and create LineItem level controls
            items: this.formBuilder.array([this.createLineItemFormControls()])
            // lineItemControls: this.createLineItemFormControls()
        })
    }
*/

/*

 const fg = this.tender.items.map(item => {
            this.formBuilder.group(item);
            //
            // console.log('sc is', item.subcontractors);
            let scG = item.subcontractors;
            this.createSubContractorForm(scG);

        });
        const fa = this.formBuilder.array(fg);

        this.masterForm.setControl('items', fa);
        */

/* createSubContractorForm(sc) {
const scFG = sc.map(item => this.formBuilder.group(item));
console.log(scFG);
const scFA = this.formBuilder.array(scFG);
// console.log(this.masterForm.controls['items'].);
//(<FormControl>this.masterForm.controls['items']).updateValue(selected.id)
//this.masterForm.controls['items'].controls['subcontractor']
//setControl('subcontractor', scFA);
// ['subcontractor']
} */

/*
    private generateLineItemsControls() {
        return this.formBuilder.group({
            itemNo: [''],
            specNo: [''],
            itemName: [''],
            description: [''],
            unit: [''],
            unitPrice: [''],
            quantity: [''],
            totalPrice: [''],
            subcontractors: this.formBuilder.array([this.formBuilder.group({
                name: [''],
                subitems: this.formBuilder.array([this.formBuilder.group({
                    id: [''],
                    name: [''],
                    quantity: [''],
                    unit: [''],
                    unitPrice: [''],
                    totalPrice: ['']
                })])
            })]),
            equipments: this.formBuilder.array([this.formBuilder.group({
                _id: [''],
                name: [''],
                description: [''],
                rate: [''],
                type: ['']
            })]),
            labours: this.formBuilder.array([this.formBuilder.group({
                _id: [''],
                name: [''],
                description: [''],
                rate: [''],
                type: [''],
                createdAt: ['']
            })])
        })
        //
        // return lineItemForm;

    }
*/
