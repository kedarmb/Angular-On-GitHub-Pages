import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../../shared/core/service/http.service';
import { NgProgressComponent, NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../shared/core/service/helper.service';
import { TenderService } from '../../../shared/core/service/tender.service';
import { NgxSpinnerService } from 'ngx-spinner';
//
import { regex } from '../../../shared/core/constant/index';
import { NotifySubcontractorComponent } from 'app/shared/components/notify-subcontractor/notify-subcontractor.component';

@Component({
  selector: 'app-tender-review',
  templateUrl: './tender-review.component.html',
  styleUrls: ['./tender-review.component.scss']
})
export class TenderReviewComponent implements OnInit {
  accordion = {};
  crews = {};
  model: any;
  searching = false;
  searchFailed = false;
  states = [];
  lineItems: any = [];
  //
  tenderID: any;
  sections = [];
  loadedSections = [];

  tenderData: any;
  //
  masterForm: FormGroup; // var to store form

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private progress: NgProgress,
    private httpService: HttpService,
    private hs: HelperService,
    private toastr: ToastrService,
    private ts: TenderService,
    private spinner: NgxSpinnerService
  ) {
    //
    this.activatedRoute.params.subscribe(params => {
      // console.log('view tender params ', window.history.state);
      this.tenderData = window.history.state;
      this.tenderID = this.tenderData._id;
      // this.invitedSubs = this.tenderID
      console.log('TenderReviewComponent  param data .. ', this.tenderData);
      // this.notifiedSubIds = paramData['headerLevelNotifiedSubs'];
      // this.modifyNotifiedSubList();
      // this.setDataforQuotePage(paramData);
      this.handleTenderData();
      //
      return;
    });
    //
  }

  ngOnInit() {}
  back() {
    this.router.navigateByUrl('/tender');
  }

  handleTenderData() {
    if (this.masterForm == null) {
      this.initMasterForm();
    }
    console.log('handleTenderData.... ', this.tenderData);
    if (this.tenderData) {
      /* console.log(this.tenderData);
      this.masterForm.patchValue(this.tenderData); */
      if (this.tenderData.sections === null && this.tenderData.sections === []) {
        // open blank master form
      } else if (this.tenderData.sections !== null && this.tenderData.sections !== []) {
        // set value to the form
        // this.masterForm.setControl('sections', this.tenderData.sections);
        this.createSectionsOnGet();
      }
    }
  }

  // creating masterform
  initMasterForm() {
    this.masterForm = this.formBuilder.group({
      _id: [null],
      clientName: [''],
      name: [''],
      description: [''],
      openDate: [''],
      closeDate: [''],
      quoteStartDate: [''],
      quoteEndDate: [''],
      headerLevelNotifiedSubs: [''],
      createdBy: [null],
      updatedBy: [null],
      organizationRef: [null],
      // sections:[''],
      createdAt: [''],
      updatedAt: [''],
      sections: this.formBuilder.array([this.initSectionCtrl()])
    });
    // console.log(this.masterForm);
  }

  initSectionCtrl() {
    return this.formBuilder.group({
      _id: [null],
      name: [''],
      sectionTotalPrice: [''],
      lineItems: this.formBuilder.array([this.initLineItemCtrl()])
    });
  }
  initLineItemCtrl() {
    return this.formBuilder.group({
      _id: [null],
      specNo: [''],
      itemNo: [''],
      itemName: [''],
      description: [''],
      unit: [null, [Validators.required, Validators.pattern(regex.alphaNumeric)]],
      unitPrice: [null, [Validators.required, Validators.pattern(regex.numericDecimal)]],
      quantity: [null, [Validators.required, Validators.pattern(regex.numericDecimal)]],
      trench: [''],
      crew: [''],
      notifiedSubs: [null],
      selectedSub: [null],
      lineItemCrewLabourItems: [null],
      lineTotalPrice: [null],
      subLineItems: [null],
      crewChosen: [],
      crewItemRef: [null],
      trenchRef: [null]
    });
  }

  createSectionsOnGet() {
    const sections_array = this.masterForm.get('sections') as FormArray;
    // remove the empty element already created:
    while (sections_array.length !== 0) {
      sections_array.removeAt(0);
    }
    //
    this.tenderData.sections.forEach(sectionRef => {
      // console.log('sectionRef is ', sectionRef);
      //
      sections_array.push(
        this.formBuilder.group({
          _id: sectionRef._id,
          name: sectionRef.name,
          lineItems: this.createLineItemsOnGet(sectionRef)
          // lineItems: this.createLineItemForm(sectionRef)
        })
      );
    });
    // console.log(this.masterForm);
  }

  createLineItemsOnGet(sectionRef) {
    const line_items_array = new FormArray([]);
    // console.log('section ref is ', sectionRef);
    //
    sectionRef.lineItems.forEach(lineItem => {
      //
      line_items_array.push(
        this.formBuilder.group({
          _id: lineItem._id,
          specNo: lineItem.specNo,
          itemNo: lineItem.itemNo,
          itemName: lineItem.itemName,
          description: lineItem.description,
          unit: lineItem.unit,
          unitPrice: [0],
          // lineItem.unitPrice,
          quantity: lineItem.quantity,
          trench: lineItem.trench,
          crew: lineItem.crew,
          notifiedSubs: lineItem.notifiedSubs,
          selectedSub: lineItem.selectedSub,
          lineItemCrewLabourItems: lineItem.lineItemCrewLabourItems,
          lineTotalPrice: ['0'],
          // lineItem.lineTotalPrice,
          crewItemRef: lineItem.crewItemRef,
          crewChosen: [],
          trenchRef: lineItem.trenchRef,
          subLineItems: []
        })
      );
    });
    return line_items_array;
  }

  __addSection() {
    const sectionsArr = this.masterForm.get('sections') as FormArray;
    const newSection = this.initSectionCtrl();
    sectionsArr.push(newSection);
  }

  deleteSection() {
    this.toastr.warning('Functionality under development', 'Delete Section');
  }
  __addLineItem(sectionRef) {
    const _lineItem = this.initLineItemCtrl();
    const lineItemArr = sectionRef.get('lineItems') as FormArray;
    lineItemArr.push(_lineItem);
  }

  saveLineItem(sectionRef, indx) {
    // /v1/line-item/tender/:tenderId/section/:sectionId
    // TODO: to add section ID with checking on the append string
    const _lineItmRef = (sectionRef.get('lineItems') as FormArray).at(indx);
    console.log('good to go ..... ', _lineItmRef.value);
    if (!this.checkLineDataValidity(_lineItmRef)) {
      return;
    }
    //

    // return;
    const id = this.tenderData._id;
    const _lineItm = _lineItmRef.value;
    let appendStr = '/tender/' + id + '/section/' + '9e2f4d4ade8a06001ea71e91';
    // trim the payload with necessary key-values for line item only
    const payload = this.hs.pickChosenProps(
      _lineItm,
      'specNo',
      'itemNo',
      'itemName',
      'description',
      'unit',
      'unitPrice',
      'quantity'
    );
    payload['name'] = sectionRef.value.name;
    //
    if (sectionRef.value._id != null) {
      delete payload.name;
      appendStr = '/tender/' + id + '/section/' + sectionRef.value._id;
    }
    //
    this.spinner.show();
    //
    if (_lineItm._id === null) {
      // this is a new line item .. to save it
      this.doSave(appendStr, payload);
      //
    } else if (_lineItm._id !== null) {
      // this is a saved line item .. to update it
      appendStr = '/' + _lineItm._id + '/tender/' + id + '/section/' + sectionRef.value._id;
      this.doUpdate(appendStr, payload);
    }
  }

  private doSave(appendStr, payload) {
    console.log('doSave >>> append string .. ', appendStr);
    this.httpService.saveLineItem(appendStr, payload).subscribe(
      response => {
        // console.log('success saving line itm ', response);
        this.spinner.hide();
        if (response.status === 201) {
          // console.log('line item saved .. calling GET API ...');
          this.toastr.success('Line Item saved.');
          this.refreshFormData();
        }
      },
      err => {
        this.spinner.hide();
        console.log('save line itm ERR ', err);
      }
    );
  }

  // checks data validity as per validation rule defined on form control
  checkLineDataValidity(_lineItemRef) {
    let _isValid = true;
    if (_lineItemRef.get('unit').invalid) {
      this.toastr.warning('Unit must be filled without special characters.');
      _isValid = false;
    } else if (_lineItemRef.get('unitPrice').invalid) {
      this.toastr.warning('Unit Price must be filled with numeric value.');
      _isValid = false;
    } else if (_lineItemRef.get('quantity').invalid) {
      this.toastr.warning('Quantity must be filled with numeric value.');
      _isValid = false;
    }
    return _isValid;
  }
  //
  private doUpdate(appendStr, payload) {
    console.log('doUpdate >>> append string .. ', appendStr);
    this.httpService.updateLineItem(appendStr, payload).subscribe(
      response => {
        console.log('success saving line itm ', response);
        this.spinner.hide();
        if (response.status === 200) {
          // console.log('line item saved .. calling GET API ...');
          this.toastr.success('Line Item updated.');
          this.refreshFormData();
        }
      },
      err => {
        this.spinner.hide();
        console.log('save line itm ERR ', err);
      }
    );
  }
  __removeLineItem(sectionRef, indx) {
    const lineItemArr = sectionRef.get('lineItems') as FormArray;
    if (lineItemArr.length === 1) {
      this.toastr.warning('At least one line item shoud stay', 'Action denied');
      return;
    }
    lineItemArr.removeAt(indx);
    this.toastr.info('not deleted from database. Functionality under development', 'Dlelete Action');
  }

  // line item calculation
  calculateLineItemUnitPrice(lineItemRef) {
    // console.log(lineItemRef.controls['quantity'].value, lineItemRef.controls['lineTotalPrice'].value);
    const lineQty = lineItemRef.controls['quantity'].value;
    const lineTotal = lineItemRef.controls['lineTotalPrice'].value;
    const lineUnit = Math.floor(lineTotal / lineQty).toFixed(2);
    lineItemRef.controls['unitPrice'].patchValue(lineUnit);
  }
  refreshFormData() {
    this.httpService.getTenderDetailById(this.tenderData._id).subscribe(
      response => {
        // console.log('get API seccess .. ', response);
        if (response.status === 200) {
          console.log('refreshFormData :: get API seccess .. ', response);
          this.tenderData = response.body;
          this.masterForm.reset();
          //
          this.hs.updateLocalTenderListByID(this.tenderData);
          this.createSectionsOnGet();
        }
      },
      err => {
        console.log('err ', err);
      }
    );
  }

  gotoQuotePage() {
    this.spinner.show();
    this.router.navigateByUrl('view-tender/', { state: this.tenderData });
  }
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

  getTenderByID() {
    // console.log('getTenderByID invoked ');
    this.httpService.getTenderDetailById(this.tenderID).subscribe(
      response => {
        // console.log('success getTenderDetailById ', response);
        if (response.status === 200) {
          // console.log('success getTenderDetailById ', response.status);
          this.hs.updateLocalTenderListByID(response.body);
          /* this.notifiedSubIds = response.body['headerLevelNotifiedSubs'];
        this.modifyNotifiedSubList(); */
          this.tenderData = response.body;
          // this.toastr.success('Selected Sub Contractors have been notified.');
        }
      },
      err => {
        console.log('Error getting Tender by id ', err);
      }
    );
  }
}
