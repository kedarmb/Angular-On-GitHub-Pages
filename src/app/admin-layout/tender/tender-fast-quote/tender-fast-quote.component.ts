import { PlatformLocation } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'app/shared/core/service/http.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from 'app/shared/core/service/helper.service';

@Component({
  selector: 'app-tender-fast-quote',
  templateUrl: './tender-fast-quote.component.html',
  styleUrls: ['./tender-fast-quote.component.scss']
})
export class TenderFastQuoteComponent implements OnInit {
  sublineForm: any;
  tenderID: any;
  subId: any;
  subData: any;
  tenderData: any;
  subContractorId: any;
  filteredTender = [];

  constructor(private formBuilder: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute, private hs: HelperService,
    private httpService: HttpService, private toastr: ToastrService,
    location: PlatformLocation) {
    // this.tenderData = this.router.getCurrentNavigation().extras.state;
    // console.log(this.tenderData);
    this.subId = this.hs.getSession('subConIdNow');
    this.subData = JSON.parse(this.hs.getSession('sublineDataNow'));
    console.log(this.subData);

    this.tenderID = JSON.parse(this.hs.getSession('tenderIdNow'));
    if (this.subId) {
      console.log(this.subData);
      this.filteredTender = this.subData.filter((e: any) => {
        return e.subContractorId._id === this.subId;
      })
      console.log(this.filteredTender);
    };

    this.activatedRoute.params.subscribe((e) => {
      console.log(e);
      this.subContractorId = e.id;
    });

    location.onPopState((e) => {
      if (e.type === 'popstate') {
        this.router.navigate(['/fast-list/' + this.tenderID]);
      }
    });
  };

  ngOnInit() {
    this.sublineForm = this.formBuilder.group({
      subline: this.setSubline()
    })
  };

  sublineFormGroup() {
    return this.formBuilder.group({
      _id: [''],
      name: [''],
      description: [''],
      unit: [''],
      unitPrice: [''],
      tender: [this.tenderID],
      subContractorId: this.formBuilder.group({
        _id: [''],
        name: ['']
      }),
      selected: [''],
      createdAt: [''],
      updatedAt: ['']
    })
  };

  sublineFormGroupVal(val) {
    if (val) {
      return this.formBuilder.group({
        _id: [val._id],
        name: [val.name],
        description: [val.description],
        unit: [val.unit],
        unitPrice: [val.unitPrice],
        tender: [this.tenderID],
        subContractorId: this.formBuilder.group({
          _id: [val.subContractorId._id],
          name: [val.subContractorId.name]
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
    if (this.filteredTender.length > 0) {
      console.log(this.filteredTender.length)
      this.filteredTender.forEach(element => {
        const tGrup = this.sublineFormGroupVal(element);
        fArr.push(tGrup);
      });
    }
    return fArr;
  }

  createSubline(val) {
    const finalVal = Object.assign([], this.sublineForm.value.subline)
    const k = finalVal.filter(e => e._id === "")
    k.map((e) => {
      delete e._id
      delete e.createdAt
      delete e.updatedAt
      delete e.selected
      e.subContractorId = this.subId;
      return e
    })
    this.httpService.createSubline(k, this.tenderID)
      .subscribe((response: any) => {
        if (response.status === 201) {
          console.log(response.body)
          this.toastr.success(response.statusText)
          if (val === true) {
            this.router.navigate(['/fast-list/' + this.tenderID]);

          }
        }
      },
        error => {
          this.toastr.error(error.error.message)
        }
      )
  }
  cancel() {
    this.router.navigate(['/fast-list/' + this.tenderID]);
  }
}
