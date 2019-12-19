import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { CrewService } from '../../shared/core/service/crew.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TenderService } from '../../shared/core/service/tender.service';
import { Tender } from '../../shared/core/model/tender.model';
import { TenderItem } from '../../shared/core/model/tender-item.model';
import * as uuid from 'uuid';
import { CrewModalComponent } from 'app/shared/components/crew-modal/crew-modal.component';
import { NotifySubcontractorComponent } from 'app/shared/components/notify-subcontractor/notify-subcontractor.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { isArray } from 'util';
import { HttpService } from '../../shared/core/service/http.service';
@Component({
    selector: 'app-view-tender',
    templateUrl: './view-tender.component.html',
    styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit {

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

    tender: Tender = new Tender();
    sections = [{ name: 'WATERMAIN' }, { name: 'RESOTRATION' }];
    model: any;
    searching = false;
    searchFailed = false;
    states = [];
    displayedColumns: string[] = ['ItemNo', 'SpecNo', 'ItemName', 'Description',
        'Unit', 'Unit-Price', 'Quantity', 'TotalPrice'];
    lineItems: any;



    @ViewChild('instance', { static: true })
    instance: NgbTypeahead;

    focus$ = new Subject<string>();
    click$ = new Subject<string>();
    //
    masterForm: FormGroup;
    // lineItemsForm: FormGroup;

    constructor(/* private modalService: NgbModal,  */private crewService: CrewService,
        private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
        private tenderService: TenderService, private router: Router, public dialog: MatDialog,
        private httpServ: HttpService) {
        //
        this.activatedRoute.params.subscribe((params) => {
            this.httpServ.getMockLineItems().subscribe((data) => {
                console.log('success fetching MOCK lineitems ', data);
            }, (err) => {
                console.log('failed to load mock line items ', err);
            })

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
        // this.crewService.getAll().subscribe((crews) => {
        //     crews.map((crew) => {
        //         this.crews[crew.name] = crew;
        //         this.states.push(crew.name);
        //     })
        // });
    }

    ngOnInit() {
        // this.itemPropertiesArray = [];
        // this.initilizeMasterForm();
        //  this.mapValuesIntoForm();
    }

    printConsole(param) {
        // console.log(JSON.stringify(param));
        // console.log(param.get('name').value);
        // https://stackblitz.com/edit/reactive-forms-generate-very-large-form-final?file=src%2Fapp%2Fapp.component.html
    }
    getMasterForm() {
        // console.log()
        this.masterForm = this.formBuilder.group({
            items: this.formBuilder.array([])
            // this.formBuilder.array([this.generateLineItemsControls()])
        })
    }

    createLineItemForm() {
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
                /* subCnt.subitems.forEach((subItem, subIndex) => {
                    //
                    // console.log('subItem is ', subItem);
                    const subItemsNode: FormArray = ((<FormArray>(<FormArray>lineItemFormArr.controls[index].get('subcontractors'))
                        .controls[subCntIndex].get('subitems')));
                    //
                    subItemsNode.push(this.createSubItemsCtrls(subItem));
                }) */

            })

            /* item.equipments.forEach((equipment, equipIndex) => {
                const equipmentNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('equipments'));
                equipmentNode.push(this.createEquipmentControls(equipment))
            }) */
            //
            /* item.labours.forEach((labour, labourIndex) => {
                const labourNode: FormArray = (<FormArray>lineItemFormArr.controls[index].get('labours'));
                labourNode.push(this.createLaboursControls(labour));
            }) */
        })
        // console.log(this.masterForm)
        this.masterForm.get('items')['controls'].map((item) => {
            // console.log(item)
            /* item.get('equipments')['controls'].map(eq => {
                // console.log(eq)
            },
                item.get('subcontractors')['controls'].map(sub => {
                    // console.log(sub)
                    // console.log(item)
                    sub.get('subitems')['controls'].map(subItem => {
                        //
                    })
                })
            ) */
        }
        )
    }




    createItemCtrl(element) {
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
    }
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

    delete(item) {
        this.tender.items = this.tender.items.filter((v) => {
            if (v.id === item.id) {
                return false;
            } else {
                return true;
            }
        })
    }

    add() {
        const tenderItem = new TenderItem();
        tenderItem.id = uuid.v4();
        this.tender.items.unshift(tenderItem);
    }

    addLineItem() {
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

    }

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
    addSection() {
        this.sections.push({ name: 'Enter Section Name' });
    }
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
