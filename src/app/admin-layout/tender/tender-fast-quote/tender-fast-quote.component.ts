import { Subcontractor } from './../../../shared/core/model/subcontractor.model';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'app/shared/core/service/http.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { HelperService } from 'app/shared/core/service/helper.service';

@Component({
  selector: 'app-tender-fast-quote',
  templateUrl: './tender-fast-quote.component.html',
  styleUrls: ['./tender-fast-quote.component.scss']
})
export class TenderFastQuoteComponent implements OnInit {
  sublineForm: any;
  tenderID: any;
  tenderData: any;
  subContractorId: any;
  filteredTender = [];

  constructor(private formBuilder: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute, private hs: HelperService,
    private httpService: HttpService, private toastr: ToastrService) {
    this.tenderData = this.router.getCurrentNavigation().extras.state;
    console.log(this.tenderData);
    if (this.tenderData.subId) {
      console.log(this.tenderData.sub)
      this.filteredTender = this.tenderData.sub.filter((e: any) => {
        return e.subContrctorId._id === this.tenderData.subId
      })
      // const uniqueArr = new Set(this.filteredTender);
      // console.log(uniqueArr)
      console.log(this.filteredTender);
    }
    this.activatedRoute.params.subscribe((e) => {
      console.log(e);
      this.subContractorId = e.id
    })

    // router.events
    //   .subscribe((event: NavigationStart) => {
    //     if (event.navigationTrigger === 'popstate') {
    //       // Perform actions
    //       this.router.navigate(['/tender'])
    //       console.log(event);
    //     }
    //   });
  }

  ngOnInit() {
    this.sublineForm = this.formBuilder.group({
      subline: this.setSubline()
    });

  }

  sublineFormGroup() {
    return this.formBuilder.group({
      _id: [''],
      name: [''],
      description: [''],
      unit: [''],
      unitPrice: [''],
      tender: [this.tenderData.tenderId],
      subContrctorId: this.formBuilder.group({
        _id: [''],
        name: ['']
      }),
      selected: [''],
      createdAt: [''],
      updatedAt: ['']
    })
  }

  sublineFormGroupVal(val) {
    if (val) {
      return this.formBuilder.group({
        _id: [val._id],
        name: [val.name],
        description: [val.description],
        unit: [val.unit],
        unitPrice: [val.unitPrice],
        tender: [this.tenderData.tenderId],
        subContrctorId: this.formBuilder.group({
          _id: [val.subContrctorId._id],
          name: [val.subContrctorId.name]
        }),
        selected: [val.selected],
        createdAt: [val.createdAt],
        updatedAt: [val.updatedAt]
      })
    }
  }

  addLineItem() {
    const lineItemArr: FormArray = this.sublineForm.get('subline') as FormArray;
    console.log(lineItemArr);
    lineItemArr.push(this.sublineFormGroup());
  }
  removeLineItem(subRef, i) {
    const lineItemArr: FormArray = this.sublineForm.get('subline') as FormArray;
    console.log(lineItemArr);
    lineItemArr.removeAt(i);
  }

  setSubline() {
    const fArr = new FormArray([]);
    // push in the fA
    if (this.filteredTender.length > 0) {
      console.log(this.filteredTender.length)
      this.filteredTender.forEach(element => {
        const tGrup = this.sublineFormGroupVal(element);
        fArr.push(tGrup);
      });
    }
    return fArr;
  }

  createSubline() {
    const finalVal = Object.assign([], this.sublineForm.value.subline)
    const k = finalVal.filter(e =>  e._id == "" )
    k.map((e) => {
      delete e._id
      delete e.createdAt
      delete e.updatedAt
      delete e.selected
      e.subContrctorId = this.tenderData.subId;
      return e
    })
    this.httpService.createSubline(k, this.tenderData.tenderId)
      .subscribe((response: any) => {
        if (response.status === 201) {
          console.log(response.body)
          this.toastr.success(response.statusText)
        }
      },
        error => {
          this.toastr.error(error.error.message)
        }
      )
  }

  compare() {
    this.router.navigate(['/fast-compare/' + this.tenderData.tenderId], { state: this.tenderData.tenderId });
  }
}
