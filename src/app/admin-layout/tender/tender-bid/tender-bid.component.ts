import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy,ViewChild,QueryList,AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TenderBidHelperComponent } from 'app/shared/components/view-bid-modal/view-bid-modal.component';

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
  taxAmount = 0
  totalBidAmount= 0
  notSaveEnable:boolean=false

  constructor(private httpService: HttpService, 
    private router: Router,
    private hs: HelperService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    ) {

   }

  ngOnInit() {
    this.hs.tenderId.subscribe(tenderId => this.tenderId = tenderId)
    if(this.tenderId){
      this.httpService.getSubmittedBid(this.tenderId).subscribe((response) => {
        if(response.body){
          this.bidEnable = false
          this.tender = response.body
          this.sectionTotal=this.tender.bidTotalPrice
          this.taxPercent=this.tender.taxPercent,
          this.taxAmount=this.tender.bidTotalTax,
          this.totalBidAmount=this.tender.bidFinalTotal
          // this.getSectionTotal(this.tender)
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
      }
    }, (error) => {
      this.tender = []
    })
}

saveBid(){
    const tenderDetails={
      tenderId:this.tenderId,
      bidTotalPrice:this.sectionTotal,
      taxPercent:this.taxPercent,
      bidTotalTax:this.taxAmount,
      bidFinalTotal:this.totalBidAmount
    }
    return this.httpService.saveBid(tenderDetails).subscribe((response) => {
      this.tender = response.body
      this.sectionTotal=this.tender.bidTotalPrice
      this.taxPercent=this.tender.taxPercent,
      this.taxAmount=this.tender.bidTotalTax,
      this.totalBidAmount=this.tender.bidFinalTotal
    },error=>{
      this.tender = []
    })
}

 
getSectionTotal(tender){
  if(tender&&tender.sections&&tender.sections.length){
    tender.sections.map(section=>{
      if(section.sectionTotalPrice&&parseInt(section.sectionTotalPrice)){
            this.sectionTotal = section.sectionTotalPrice+this.sectionTotal
      }
    })
  }
  
}

getBidTax(taxPercent){
  if(taxPercent && !isNaN(taxPercent) &&taxPercent.length>0){
   this.taxAmount = this.sectionTotal*(taxPercent/100)
   this.totalBidAmount = this.taxAmount+this.sectionTotal
  }
}

submitFinalBid(){
  const tenderDetails={
    tenderId:this.tenderId,
    bidTotalPrice:this.sectionTotal,
    taxPercent:this.taxPercent,
    bidTotalTax:this.taxAmount,
    bidFinalTotal:this.totalBidAmount
  }
  return this.httpService.submitFinalBid(tenderDetails).subscribe((response) => {
    this.bidEnable =false 
    this.tender = response.body
    this.sectionTotal=this.tender.bidTotalPrice
    this.taxPercent=this.tender.taxPercent,
    this.taxAmount=this.tender.bidTotalTax,
    this.totalBidAmount=this.tender.bidFinalTotal
    
  },error=>{
    this.tender = []
  })

}

getlineItemDetails(item){
  const dialogRef = this.dialog.open(TenderBidHelperComponent, {
    height: 'auto',
    width: '75%',
    maxHeight: '95vh',
    data: {item:item},
    disableClose: true
  });
  //
  dialogRef.afterClosed().subscribe(result => {
    // this.getTenderByID();
  });
  
}
 
}