import { Component, ViewEncapsulation, ChangeDetectionStrategy,OnInit } from '@angular/core';
import { HttpService } from 'app/shared/core/service/http.service';
import { HelperService } from 'app/shared/core/service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: "app-tender-compare",
  templateUrl: "./tender-compare.component.html",
  styleUrls: ["./tender-compare.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenderCompareComponent implements OnInit{
  lineTotal: any;
  selection;
  tenderCompare;
  tender:any
  tenderId:any
  notifiedSub
  public calculateSecTotal = 0
  public sectionTotal
  calculatedSectionTotal
  selectedSubList:any =[]
  sectionList:any=[]
  displayedColumns: string[] = ['select', 'SubContractor', 'unitPrice', 'totalPrice'];
  previousLineItem:any=[]  
  constructor(private httpService: HttpService, private router: Router, private hs: HelperService,private toastr: ToastrService) {
    // this.getTenderById("5e5e3c91aa168f7ea40f864f")
    // this.tenderId="5e5e3c91aa168f7ea40f864f"
  }

ngOnInit(){
  this.hs.tenderId.subscribe(tenderId => this.tenderId = tenderId)
  if(this.tenderId)
      this.getTenderById(this.tenderId)
else 
this.toastr.info("tender not found")

}
calculateSectionTotal(selectedSub){
  this.sectionTotal = selectedSub.reduce(function(r, e) {
    var section = e.section
    if (r[section] == undefined) {
        r[section] = {section: section,totalPrice:e.totalPrice};
    }
    else{
    r[section].totalPrice= r[section].totalPrice+e.totalPrice  
    }  
    return r
  },{})
}

getSectionTotal(sectionId,sectionTotal) {
      if(this.sectionTotal&&this.sectionTotal[sectionId]){
        return this.sectionTotal[sectionId].totalPrice
      }else{
        if(sectionTotal)
        return sectionTotal
        else
        return 0
      }
    // }else{
    //   if(this.sectionTotal&&this.sectionTotal[sectionId]){
    //     return this.sectionTotal[sectionId].totalPrice
    //   }else{
    //     return 0
    // }
    
}
  



getSelectedLineItem(event,section,lineItem,subContractorId,totalPrice,sectionTotal){
  if(event){
    if(this.previousLineItem){
 if(this.sectionList&&!this.sectionList.length){
  this.sectionList.push({section,totalPrice,lineItem,subContractorId})
 }else if(this.sectionList&&this.sectionList.length==1&&section==this.previousLineItem.section&&lineItem==this.previousLineItem.lineItem&&subContractorId!=this.previousLineItem.subContractorId){
  this.sectionList=[{section,totalPrice,lineItem,subContractorId}]
 }else if(this.sectionList&&this.sectionList.length==1&&section==this.previousLineItem.section&&lineItem!=this.previousLineItem.lineItem){
  this.sectionList.push({section,totalPrice,lineItem,subContractorId})
 }else if(this.sectionList&&this.sectionList.length&&section!=this.previousLineItem.section){
  this.sectionList = this.sectionList.filter(obj=>(obj.section==section&&obj.lineItem!=lineItem&&obj.subContractorId!=subContractorId)||(obj.section!=section))
  this.sectionList.push({section,totalPrice,lineItem,subContractorId})
 }
 else{
  this.sectionList = this.sectionList.filter(obj=>(obj.section==section&&obj.lineItem!=lineItem)||(obj.section!=section))
  this.sectionList.push({section,totalPrice,lineItem,subContractorId})
 }
  //  this.sectionList = [...saveSectionList, ...this.sectionList]
  this.previousLineItem={section,lineItem,subContractorId,totalPrice}
  this.calculateSectionTotal(this.sectionList)
  this.getSectionTotal(section,sectionTotal)
    }else{
    }
  }
  if(!event){
  // sectionList
  const deSelectedSub= this.selectedSubList.filter(obj=>(obj.subContractorId).toString()!==(subContractorId).toString())
  const removeSection=this.sectionList.filter(obj=>(obj.lineItem).toString()!==(lineItem).toString())
  this.selectedSubList = deSelectedSub
  this.sectionList = removeSection
  this.calculateSectionTotal(this.sectionList)
  this.getSectionTotal(section,sectionTotal)

  }
}

// getAlreadySelectedLineItem(section,lineItem,subContractorId,selectedSub){
//   console.log("jjjjjjjjjjjj" ,section,lineItem,subContractorId,selectedSub)
//   if(selectedSub==subContractorId){
//   this.selectedSubList.push({section,lineItem,subContractorId,totalPrice})
//   // this.sectionList.push({section,totalPrice,lineItem})

//   console.log("lllllllllll",this.selectedSubList)
// return true
//   }else{
//     return false
//   }
// }


save() {
  
  if(this.sectionList&&this.sectionList.length){
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
             init=lengthcalculation(obj.lineItems).length+init
   
           }
           if(index==this.tender.sections.length-1&&init){
           return init
          }
         }
         
      )

    }
    if(totalLineItem&&totalLineItem.length&&totalLineItem[totalLineItem.length-1]==this.sectionList.length){
    return this.httpService.updateSelectedSubForLineItem(this.tenderId,{selectedSub:this.sectionList,sectionToatal:this.sectionTotal }).subscribe((response) => {
      if (response.status === 200) {
        this.tenderCompare = response.body;
        this.toastr.success("success")
      }
    }, (error) => {
      this.toastr.error("unable to submit please try later")
    })
  }else{
    this.toastr.warning("please complete the compare")
  }
  }else{
    this.toastr.warning("please complete the compare")

  }
}

getNotifiedSubContractorName(){
  this.httpService.getNotifiedSubs(this.tenderId).subscribe((response) => {
    if (response.status === 200) {
      if(response.body){

      if(this.tender._id==response.body['_id']){
        this.notifiedSub = response.body["headerLevelNotifiedSubs"]
      }
    }
  }
    })
}

getName(id){
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
  return this.httpService.getTenderDetailById(tenderId).subscribe((response) => {
    if (response.status === 200) {
      this.tender = response.body;
      this.getNotifiedSubContractorName()
        if(this.tender&&this.tender.sections&&this.tender.sections.length){
      
          this.tender.sections.map(obj=>
            {
              if(obj&&obj.lineItems&&obj.lineItems.length){
                obj.lineItems.map(lineItem=>
                  {
                    if(lineItem&&lineItem.selectedSub){
                      this.sectionList.push({section:obj._id,lineItem:lineItem._id,subContractorId:lineItem.selectedSub,totalPrice:lineItem.total})
                    }
                  })
              }
            })
        }
      }
    }, (error) => {
      console.log('err in fetching tender headers ', error);
    })
  }
  
}
