import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class TenderService {
    // array: Tender[] = [
    //     {
    //         _id: '5dde7f6bfc6b8a42441783ab',
    //         openDate: '2019-07-07T00:00:00+00:00',
    //         closeDate: '2010-08-22T00:00:00+00:00',
    //         quoteStartDate: '2010-07-11T00:00:00+00:00',
    //         quoteEndDate: '2010-07-18T00:00:00+00:00',
    //         tenderName: 'Real time Generating',
    //         clientName: 'Aaskash Builder Pvt Ltd',
    //         items: [{
    //             id: '105',
    //             itemNo: 'A-1',
    //             specNo: 'PW.2 OPSS 442 SP',
    //             crew: 'Crew1',
    //             trench: {
    //                 height: 10,
    //                 width:
    //                     10,
    //                 length:
    //                     10,
    //                 cubeVolume:
    //                     1000,
    //                 diameter:
    //                     20,
    //                 pipeVolume:
    //                     10,
    //                 totalVolume:
    //                     100,
    //                 remaningVolume:
    //                     0
    //             },
    //             itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
    //             labours: [],
    //             equipments: [],
    //             subcontractors: [],
    //             subitems: [
    //                 { id: '1', name: 'Cement', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
    //                 { id: '2', name: 'Gloves', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
    //                 { id: '3', name: 'IRON', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 }],
    //             description:
    //                 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
    //                 'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
    //             unit:
    //                 'm',
    //             unitPrice:
    //                 0,
    //             totalPrice:
    //                 0,
    //             quantity:
    //                 896.6
    //         },
    //         {
    //             id: '106',
    //             itemNo:
    //                 'A-2',
    //             specNo:
    //                 'PW.2 OPSS 442 SP',
    //             crew:
    //                 'Crew2',
    //             trench:
    //             {
    //                 height: 10,
    //                 width:
    //                     10,
    //                 length:
    //                     10,
    //                 cubeVolume:
    //                     1000,
    //                 diameter:
    //                     20,
    //                 pipeVolume:
    //                     10,
    //                 totalVolume:
    //                     100,
    //                 remaningVolume:
    //                     0
    //             }
    //             ,
    //             itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
    //             labours: [
    //                 {
    //                     name: 'string',
    //                     description: 'string',
    //                     hourlyRate: 'string',
    //                     // type: 'string'
    //                 },
    //                 {
    //                     name: 'string',
    //                     description: 'string',
    //                     hourlyRate: 'string',
    //                     // type: 'string'
    //                 },
    //                 {
    //                     name: 'string',
    //                     description: 'string',
    //                     hourlyRate: 'string',
    //                     // type: 'string'
    //                 }
    //             ],
    //             equipments: [],
    //             subcontractors: [],
    //             subitems:
    //                 [
    //                     { id: '1', name: 'Cement', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
    //                     { id: '2', name: 'Gloves', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
    //                     { id: '3', name: 'IRON', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 }],
    //             description:
    //                 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
    //                 'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
    //             unit:
    //                 'm',
    //             unitPrice:
    //                 0,
    //             totalPrice:
    //                 0,
    //             quantity:
    //                 896.6
    //         }
    //             ,
    //         {
    //             id: '107',
    //             itemNo:
    //                 'A-3',
    //             specNo:
    //                 'PW.2 OPSS 442 SP',
    //             crew:
    //                 'Crew3',
    //             trench:
    //             {
    //                 height: 10,
    //                 width:
    //                     10,
    //                 length:
    //                     10,
    //                 cubeVolume:
    //                     1000,
    //                 diameter:
    //                     20,
    //                 pipeVolume:
    //                     10,
    //                 totalVolume:
    //                     100,
    //                 remaningVolume:
    //                     0
    //             }
    //             ,
    //             itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
    //             labours: [],
    //             equipments: [],
    //             subcontractors: [],
    //             subitems:
    //                 [
    //                     { id: '1', name: 'Cement', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
    //                     { id: '2', name: 'Gloves', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
    //                     { id: '3', name: 'IRON', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 }],
    //             description:
    //                 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
    //                 'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
    //             unit:
    //                 'm',
    //             unitPrice:
    //                 0,
    //             totalPrice:
    //                 0,
    //             quantity:
    //                 896.6
    //         }
    //             ,
    //         {
    //             id: '108',
    //             itemNo:
    //                 'A-4',
    //             specNo:
    //                 'PW.2 OPSS 442 SP',
    //             crew:
    //                 'Crew4',
    //             trench:
    //             {
    //                 height: 10,
    //                 width:
    //                     10,
    //                 length:
    //                     10,
    //                 cubeVolume:
    //                     1000,
    //                 diameter:
    //                     20,
    //                 pipeVolume:
    //                     10,
    //                 totalVolume:
    //                     100,
    //                 remaningVolume:
    //                     0
    //             }
    //             ,
    //             itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
    //             labours: [],
    //             equipments: [],
    //             subcontractors: [],
    //             subitems:
    //                 [
    //                     { id: '1', name: 'Cement', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
    //                     { id: '2', name: 'Gloves', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
    //                     { id: '3', name: 'IRON', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 }],
    //             description:
    //                 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
    //                 'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
    //             unit:
    //                 'm',
    //             unitPrice:
    //                 0,
    //             totalPrice:
    //                 0,
    //             quantity:
    //                 896.6
    //         }
    //         ]

    //     }

    // ];
    constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
    }
    createItemCtrl(element) {
        return this.formBuilder.group({
            itemNo: [element.itemNo],
            specNo: [element.specNo],
            name: [element.itemName],
            description: [element.description],
            unit: [element.unit],
            unitPrice: [element.unitPrice],
            quantity: [element.quantity],
            totalPrice: [element.totalPrice],
            crewRef: [element.crewRef],
            tenderRef: [element.tenderRef],
            sectionRef: [element.sectionRef],
            quoteRef: [element.quoteRef],
            createdBy: [element.cretedBy],
            subitems: this.formBuilder.array([])
        })
    }

    createSublineItemsCtrls(element?) {
        return this.formBuilder.group({
            // id: [element.id],
            quoteRef: [element.quoteRef],
            itemRef: [element.itemRef],
            description: [element.description],
            specNo: [element.specNo],
            organizationRef: [element.organizationRef],
            createdBy: [element.createdBy],
            name: [element.name],
            unit: [element.unit],
            unitPrice: [element.unitPrice],
            quantity: [element.quantity],
            totalPrice: [element.totalPrice]
        })
    }

}
