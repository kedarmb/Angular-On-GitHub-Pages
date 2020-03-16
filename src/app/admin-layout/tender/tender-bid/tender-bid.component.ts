import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy,ViewChild,QueryList,AfterViewInit } from '@angular/core';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tender-bid',
  templateUrl: './tender-bid.component.html',
  styleUrls: ['./tender-bid.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenderBidComponent implements OnInit {
  tenderId:any
  tender:any
  bidEnable:boolean=false
  sectionTotal=0
  taxPercent =0
  taxAmmount = 0
  totalBidAmmount= 0
  notSaveEnable:boolean=false

  constructor(private httpService: HttpService, private router: Router, private hs: HelperService,private toastr: ToastrService) {

   }

  ngOnInit() {
    this.hs.tenderId.subscribe(tenderId => this.tenderId = tenderId)
    if(this.tenderId){
      this.httpService.getSubmittedBid(this.tenderId).subscribe((response) => {
        console.log("hhhhhhhhhhhhhhh",response.body)
        if(response.body){
          this.bidEnable = false
          this.tender = response.body
          this.sectionTotal=this.tender.bidTotalPrice
          this.taxPercent=this.tender.taxPercent,
          this.taxAmmount=this.tender.bidTotalTax,
          this.totalBidAmmount=this.tender.bidFinalTotal
          // this.getSectionTotal(this.tender)
          console.log("kkkkkkkkkkkkkkkkkkkkkkk",response.body)
        }else{
          this.bidEnable = true
          this.getTenderById(this.tenderId) 
        }
        },error=>{
          this.bidEnable = true
          this.tender =[]
        })
    }
    else 
       this.toastr.info("tender not found")
  }

disableMethod(value){
  this.notSaveEnable=true
}
  
getTenderById(tenderId){
  return this.httpService.getTenderDetailById(tenderId).subscribe((response) => {
    if (response.status === 200||response.body) {
      this.tender = response.body;
      this.getSectionTotal(this.tender)
      console.log(this.tender,"tenderrrrrrrrrrrrrr")
      }
    }, (error) => {
      this.tender = []
      console.log('err in fetching tender headers ', error);
    })
}

saveBid(){
    const tenderDetails={
      tenderId:this.tenderId,
      bidTotalPrice:this.sectionTotal,
      taxPercent:this.taxPercent,
      bidTotalTax:this.taxAmmount,
      bidFinalTotal:this.totalBidAmmount
    }
    return this.httpService.saveBid(tenderDetails).subscribe((response) => {
      console.log("ssssssssssss",response.body)
      this.tender = response.body
      this.sectionTotal=this.tender.bidTotalPrice
      this.taxPercent=this.tender.taxPercent,
      this.taxAmmount=this.tender.bidTotalTax,
      this.totalBidAmmount=this.tender.bidFinalTotal
    },error=>{
      this.tender = []
      console.log('err in fetching tender headers ', error);
    })
}

 
getSectionTotal(tender){
  if(tender&&tender.sections&&tender.sections.length){
    tender.sections.map(section=>{
      if(section.sectionTotalPrice&&parseInt(section.sectionTotalPrice)){
            this.sectionTotal = section.sectionTotalPrice+this.sectionTotal
            console.log("fffffffffffffffff",this.sectionTotal)
      }
    })
  }
  
}

getBidTax(taxPercent){
  if(taxPercent && !isNaN(taxPercent)){
   this.taxAmmount = this.sectionTotal*(taxPercent/100)
   console.log(this.taxAmmount)
   this.totalBidAmmount = this.taxAmmount+this.sectionTotal
   console.log(this.totalBidAmmount)
  }else{
   this.toastr.info('please provde correct percentage')
  }
}

submitFinalBid(){
  const tenderDetails={
    tenderId:this.tenderId,
    bidTotalPrice:this.sectionTotal,
    taxPercent:this.taxPercent,
    bidTotalTax:this.taxAmmount,
    bidFinalTotal:this.totalBidAmmount
  }
  return this.httpService.submitFinalBid(tenderDetails).subscribe((response) => {
    this.bidEnable =false 
    console.log("ssssssssssss",response.body)
    this.tender = response.body
    this.sectionTotal=this.tender.bidTotalPrice
    this.taxPercent=this.tender.taxPercent,
    this.taxAmmount=this.tender.bidTotalTax,
    this.totalBidAmmount=this.tender.bidFinalTotal
    
  },error=>{
    this.tender = []
    console.log('err in fetching tender headers ', error);
  })

}

getlineItemDetails(item){
  console.log("kkkkkkkkkklllllll",item)
}
 
}
