import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { ToastrService } from 'ngx-toastr';

import { id } from 'date-fns/locale';
import { Router } from '@angular/router';
@Component({
  selector: "app-tender-compare",
  templateUrl: "./tender-compare.component.html",
  styleUrls: ["./tender-compare.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenderCompareComponent implements OnInit {
  lineTotal: any;
  selection;
  tenderCompare;
  tender:any
  tenderId:any
  notifiedSub
  
    displayedColumns: string[] = ['select', 'SubContractor', 'unitPrice', 'totalPrice'];
  // router: any;
  constructor(private httpService: HttpService, private router: Router, private hs: HelperService,private toastr: ToastrService,
    ) {

    // this.getAllTenders();
    this.getTenderById("5e5640b1e89fd6001e517bc7")
    this.tenderId="5e5640b1e89fd6001e517bc7"
    
    console.log("ddddddjaaaaaa",this.selectedSubList)
  }

  ngOnInit() {
    // this.tenderId=JSON.parse(this.hs.getSession('tenderIdNow'));
    // console.log("hhhhhhhhhh",this.tenderId);
    // if(this.tenderId){
    // this.getTenderById(this.tenderId)
    // }else{
    //   this.toastr.info("TENDER NOT AVAILABLE")
    // }

    // this.fetchLineTotal();
  }
  fetchLineTotal(sec, lt, slt) {
    this.lineTotal = this.tender.sections[sec].lineItems[
      lt
    ].lineItemTotal.filter(val => val.quoteSub === slt);
    console.log(this.lineTotal);
  }
 public calculateSecTotal = 0

  getTotal(event, total) {
    console.log("jjjjjjjjjjjjjjjjjj")
    if(!event) {
      console.log(' true', this.calculateSecTotal)
      this.calculateSecTotal = Math.abs(this.calculateSecTotal - parseInt(total))
    } if (event) {

      this.calculateSecTotal = parseInt(total) + this.calculateSecTotal
      console.log('false', this.calculateSecTotal)
  }
}
selectedSubList =[]
getSelectedLineItem(event,section,lineItem,subContractorId){
  console.log(section,lineItem,subContractorId)
  if(event){
  this.selectedSubList.push({section,lineItem,subContractorId})
  console.log("ggggggg",this.selectedSubList)
  }
if(!event){
 const deSelectedSub= this.selectedSubList.filter(obj=>(obj.subContractorId).toString()!==(subContractorId).toString())
 this.selectedSubList = deSelectedSub
 console.log( "ddddddddddd",deSelectedSub,this.selectedSubList)
}
}

getAlreadySelectedLineItem(section,lineItem,subContractorId,selectedSub){
  console.log("jjjjjjjjjjjj" ,section,lineItem,subContractorId,selectedSub)
  if(selectedSub==subContractorId){
  this.selectedSubList.push({section,lineItem,subContractorId})
  console.log("lllllllllll",this.selectedSubList)
return true
  }else{
    return false
  }
}


save() {
  
  if(this.selectedSubList&&this.selectedSubList){
    let totalLineItem =[]
    if(this.tender&&this.tender.sections&&this.tender.sections.length){
    let init =0
    totalLineItem=this.tender.sections.map(
        (obj,index) =>{
          function lengthcalculation(lineItems){
           return lineItems.filter(obj=>{
            if(obj.lineTotalPrice&&obj.lineTotalPrice.length)
                        return true
          })
        }
          if(obj.lineItems&&obj.lineItems.length&&lengthcalculation(obj.lineItems).length){
             console.log("jjjjjjjjjjjjj",lengthcalculation(obj.lineItems))
             init=lengthcalculation(obj.lineItems).length+init
   
           }
           if(index==this.tender.sections.length-1&&init){
             console.log("final valueee",init)
           return init
          }
         }
         
      )
      console.log("dddddddddd",totalLineItem)


    }
    if(totalLineItem&&totalLineItem.length&&totalLineItem[0]==this.selectedSubList.length){
    return this.httpService.updateSelectedSubForLineItem(this.tenderId,this.selectedSubList).subscribe((response) => {
      if (response.status === 200) {
        this.tenderCompare = response.body;
        console.log(this.tenderCompare)
      }
    }, (error) => {
      this.toastr.error("unable to submit please try later")
      // this.toastr.error(error.error.message)

      console.log('err in fetching tender headers ', error);
    })
  }else{
    this.toastr.warning("please complete the compare")
    // console.log("please complete the compare")
  }
  }else{
    this.toastr.warning("please complete the compare")

    // console.log("select the line item")
  }
  this.router.navigateByUrl('bid')
}
getAllTenders() {
    const appendStr = '/0/0';
    return this.httpService.getTenders(appendStr).subscribe((response) => {
      if (response.status === 200) {
        this.tenderCompare = response.body;
        console.log(this.tenderCompare)
      }
    }, (error) => {
      console.log('err in fetching tender headers ', error);
    })
}
getNotifiedSubContractorName(){
  this.httpService.getNotifiedSubs(this.tenderId).subscribe((response) => {
    if (response.status === 200) {
      console.log("dddddddddddddddddddddddd",response.body);
      console.log("ddddsgsggs",response.body['_id'])
      console.log(response.body["headerLevelNotifiedSubs"])
      if(response.body){

      if(this.tender._id==response.body['_id']){
        this.notifiedSub = response.body["headerLevelNotifiedSubs"]
        console.log("lllllll",this.notifiedSub)
      }
      // console.log("dddddddddd",this.tender)
    }
  }
    })
}

getName(id){
  console.log("dddd",id)
  if(id){
 const newObj= this.notifiedSub.filter(obj=>obj._id==id)
 if(newObj&&newObj.length){
   
  return newObj[0].name
 }
}else{
  return "no name"
}
}
  getTenderById(tenderId){
    const appendStr = tenderId;

 return this.httpService.getTenderDetailById(appendStr).subscribe((response) => {
      if (response.status === 200) {
        this.tender = response.body;
        this.getNotifiedSubContractorName()
        console.log("dddddddddd",this.tender)
        if(this.tender&&this.tender.sections&&this.tender.sections.length){
      
          this.tender.sections.map(obj=>
            {
              if(obj&&obj.lineItems&&obj.lineItems.length){
                obj.lineItems.map(lineItem=>
                  {
                    if(lineItem&&lineItem.selectedSub){
                      console.log("jjjjjjjjjjjjjjjjjjselectedsub")
                      this.selectedSubList.push({section:obj._id,lineItem:lineItem._id,subContractorId:lineItem.selectedSub})
                    }
                  }
                  )
              }
            })
        }
      }
    }, (error) => {
      console.log('err in fetching tender headers ', error);
    })
  }
  
}
