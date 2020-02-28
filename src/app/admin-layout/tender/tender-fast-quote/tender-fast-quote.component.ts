import { ToastrService } from "ngx-toastr";
import { HttpService } from "app/shared/core/service/http.service";
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "app/shared/core/service/helper.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-tender-fast-quote",
  templateUrl: "./tender-fast-quote.component.html",
  styleUrls: ["./tender-fast-quote.component.scss"]
})
export class TenderFastQuoteComponent implements OnInit {
  sublineForm: any;
  tenderID: any;
  subId: any;
  subData: any;
  tenderData: any;
  filteredTender = [];
  selectedSub: any;
  _sub: any;
  subsDetail: any;
  filteredsubs: any;
  newSubs = [];
  subName: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private hs: HelperService,
    private httpService: HttpService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.subId = JSON.parse(this.hs.getSession("subConIdNow"));
    this.subData = JSON.parse(this.hs.getSession("sublineDataNow"));
    this.subName = this.hs.getSubName(this.subId);
    console.log(this.subName);
    this.tenderID = JSON.parse(this.hs.getSession("tenderIdNow"));
    if (this.subId) {
      this.filteredTender = this.subData.filter((e: any) => {
        return e.subContractorId._id === this.subId;
      });
    }
  }

  ngOnInit() {
    this.formInit();
    
  }

  formInit() {
    return (this.sublineForm = this.formBuilder.group({
      subline: this.setSubline()
    }));
  }
  sublineFormGroup() {
    return this.formBuilder.group({
      _id: [""],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      unit: ["", [Validators.required]],
      unitPrice: ["", [Validators.required]],
      tender: [this.tenderID],
      subContractorId: this.formBuilder.group({
        _id: [""],
        name: [""]
      }),
      selected: [""],
      createdAt: [""],
      updatedAt: [""]
    });
  }
  subConSelection(e) {
    this.selectedSub = e;
    // this._sub = e;
    this.subId = this.hs.setSession("subConIdNow", JSON.stringify(e._id));
    this.subId = JSON.parse(this.hs.getSession("subConIdNow"));
    this.subName = this.hs.getSubName(this.subId);
    console.log(this.subName);
    console.log(e);
    this.newSubs = this.subData.filter(
      obj => obj.subContractorId._id === e._id
    );
    console.log(this.newSubs);
    const subline = this.sublineForm.get("subline");
    while (subline.length !== 0) {
      subline.removeAt(0);
    }
    this.filteredTender = this.newSubs;
    console.log(this.filteredTender);
    this.formInit();
  }
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
      });
    }
  }

  addLineItem() {
    const lineItemArr: FormArray = this.sublineForm.get("subline") as FormArray;
    lineItemArr.push(this.sublineFormGroup());
  }
  removeLineItem(subRef, i) {
    const lineItemArr: FormArray = this.sublineForm.get("subline") as FormArray;
    lineItemArr.removeAt(i);
  }

  setSubline() {
    const fArr = new FormArray([]);
    if (this.filteredTender.length) {
      this.filteredTender.forEach(element => {
        const tGrup = this.sublineFormGroupVal(element);
        fArr.push(tGrup);
      });
    }
    if (!this.filteredTender.length) {
      console.log("no val");
      const tGrup = this.sublineFormGroup();
      fArr.push(tGrup);
    }
    console.log(fArr);
    return fArr;
  }
  getSubline() {
    this.spinner.show()
    this.httpService.getSubline(this.tenderID).subscribe(
      (response: any) => {
        if (response.status === 201) {
          this.spinner.hide();
          this.hs.setSession("sublineDataNow", JSON.stringify(response.body));
          this.subData = response.body;
          console.log(this.subData);
          if (this.subData.length) {
            this.subConSelection({ _id: this.subId });
            this.spinner.hide();
          }
        }
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    );
  }
  createSubline(val) {
    this.spinner.show();
    const finalVal = Object.assign([], this.sublineForm.value.subline);
    const k = finalVal.filter(e => e._id === "");
    k.map(e => {
      delete e._id;
      delete e.createdAt;
      delete e.updatedAt;
      delete e.selected;
      e.subContractorId = this.subId;
      return e;
    });
    this.httpService.createSubline(k, this.tenderID).subscribe(
      (response: any) => {
        if (response.status === 201) {
          this.spinner.hide();
          this.toastr.success(response.statusText);
          console.log(response.body);
          // this.getSubline();
          const res = response.body;
          // const respId = response.body[0].subContractorId;
          // const subName = this.hs.getSubName(respId);
          //  res.map(e => {
            //   e.subContractorId = subName;
            //   this.filteredTender.push(e);
            //   return e
            // });
            this.getSubline();
            // this.formInit();
            // console.log(this.filteredTender);
            if (val === true) {
              this.router.navigate(["/fast-list/" + this.tenderID]);
            }
          }
        },
      error => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    );
  }
  cancel() {
    this.router.navigate(["/fast-list/" + this.tenderID]);
  }
}
