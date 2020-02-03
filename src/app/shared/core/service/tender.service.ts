import { Injectable } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class TenderService {
   
    constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
    }

    initSectionCtrl() {
        return this.formBuilder.group({
            name: [''],
            totalPrice: [''],
            lineItems: this.formBuilder.array([])
        })
    }
    initLineItemCtrl() {
        return this.formBuilder.group({
            specNo: [''],
            itemNo: [''],
            name: [''],
            description: [''],
            unit: [''],
            quantity: [''],
            totalPrice: [''],
            subLineItems: this.formBuilder.array([])
            //
            /* quoteRef: [''],
            itemRef: [''],
            description: [''],
            specNo: [''],
            organizationRef: [''],
            createdBy: [''],
            name: [''],
            unit: [''],
            unitPrice: [''],
            quantity: [''], */

        })
    }
    initSubLineItemCtrl() {

    }
    getEmptySublineItem() {
        return this.formBuilder.group({
            // id: '',
            name: '',
            unit: '',
            unitPrice: '',
            quantity: '',
            totalPrice: ''
        })
    }
    /* createSectionControls() {
        const sections_array = this.masterForm.get('sections') as FormArray;
        this.tenderData.sections.forEach(sectionRef => {
            //
            sections_array.push(this.formBuilder.group({
                _id: sectionRef._id,
                name: sectionRef.name,
                lineItems: this.createLineItemsOnGet(sectionRef)
            }))
        });
    } */
    createItemCtrl(element) {
        return this.formBuilder.group({
            _id: element._id,
            specNo: element.specNo,
            itemNo: element.itemNo,
            itemName: element.itemName,
            description: element.description,
            unit: element.unit,
            unitPrice: element.unitPrice,
            quantity: element.quantity,
            trench: element.trench,
            crew: element.crew,
            notifiedSubs: element.notifiedSubs,
            selectedSub: element.selectedSub,
            lineItemCrewLabourItems: element.lineItemCrewLabourItems,
            lineTotalPrice: element.lineTotalPrice,
            crewItemRef: element.crewItemRef,
            trenchRef: element.trenchRef,
            // createdBy: [element.cretedBy],
            // subLineItems: this.formBuilder.array([])
            subLineItems: this.formBuilder.array([this.createSublineItemsCtrls(element.subLineItems)])
        })
    }

    createSublineItemsCtrls(element) {
    //     const sub_line_array = new FormArray([]);
    //     element.subLineItems.forEach(subLineItem => {
    //         console.log(subLineItem)
    //         //
    //         sub_line_array.push(this.formBuilder.group({
    //             //
    //             _id: subLineItem._id,
    //             name: subLineItem.name,
    //             unit: subLineItem.unit,
    //             unitPrice: subLineItem.unitPrice,
    //             // totalPrice: subLineItem.totalPrice,
    //             subLineTotalPrice: subLineItem.subLineTotalPrice,
    //             // quoteSub: element.quoteSub,
    //             subContrctorId: subLineItem.subContrctorId
    //         }))

    //     })
    //     console.log(sub_line_array)
    //     console.log(element)
    //     return sub_line_array;
    // //

    // Tarang+Arup's code old
        return this.formBuilder.group({
            _id: element._id,
            name: element.name,
            unit: element.unit,
            quantity: element.quantity,
            unitPrice: element.unitPrice,
            // totalPrice: subLineItem.totalPrice,
            subLineTotalPrice: element.subLineTotalPrice,
            // quoteSub: element.quoteSub,
            subContrctorId: element.subContrctorId
        })
}


}
