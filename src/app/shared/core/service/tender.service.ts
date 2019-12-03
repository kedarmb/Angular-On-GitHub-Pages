import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Organization from '../model/organization.model';
import { of } from 'rxjs';
import { Tender } from '../model/tender.model';
import { uuid } from '../../../../../node_modules/uuid';
import { API_URL } from '../constant/index';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TenderService {


    array: Tender[] = [
        {
            id: '123',
            openDate: new Date(2019, 7, 7),
            closeDate: new Date(2010, 8, 22),
            quoteStartDate: new Date(2012, 6, 27),
            quoteEndDate: new Date(2000, 8, 30),
            tenderName: 'Real time Generating',
            clientName: 'Aaskash Builder Pvt Ltd',
            items: [{
                id: '105',
                itemNo: 'A-1',
                specNo: 'PW.2 OPSS 442 SP',
                crew: 'Crew1',
                trench: {
                    height: 10,
                    width: 10,
                    length: 10,
                    cubeVolume: 1000,
                    diameter: 20,
                    pipeVolume: 10,
                    totalVolume: 100,
                    remaningVolume: 0
                },
                itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
                labours: [],
                equipments: [],
                subcontractors: [
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    }



                ],
                subitems: [
                    { id: '1', name: 'Cement', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
                    { id: '2', name: 'Gloves', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
                    { id: '3', name: 'IRON', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 }],
                description:
                    'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
                    'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
                unit:
                    'm',
                unitPrice:
                    0,
                totalPrice:
                    0,
                quantity:
                    896.6
            },
            {
                id: '106',
                itemNo:
                    'A-2',
                specNo:
                    'PW.2 OPSS 442 SP',
                crew:
                    'Crew2',
                trench:
                {
                    height: 10,
                    width:
                        10,
                    length:
                        10,
                    cubeVolume:
                        1000,
                    diameter:
                        20,
                    pipeVolume:
                        10,
                    totalVolume:
                        100,
                    remaningVolume:
                        0
                }
                ,
                itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
                labours:
                    [],
                equipments:
                    [],
                subcontractors: [
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    }



                ],
                subitems:
                    [
                        { id: '1', name: 'Cement', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
                        { id: '2', name: 'Gloves', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
                        { id: '3', name: 'IRON', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 }],
                description:
                    'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
                    'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
                unit:
                    'm',
                unitPrice:
                    0,
                totalPrice:
                    0,
                quantity:
                    896.6
            }
                ,
            {
                id: '107',
                itemNo:
                    'A-3',
                specNo:
                    'PW.2 OPSS 442 SP',
                crew:
                    'Crew3',
                trench:
                {
                    height: 10,
                    width:
                        10,
                    length:
                        10,
                    cubeVolume:
                        1000,
                    diameter:
                        20,
                    pipeVolume:
                        10,
                    totalVolume:
                        100,
                    remaningVolume:
                        0
                }
                ,
                itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
                labours:
                    [],
                equipments:
                    [],
                subcontractors: [
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    }



                ],
                subitems:
                    [
                        { id: '1', name: 'Cement', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
                        { id: '2', name: 'Gloves', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
                        { id: '3', name: 'IRON', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 }],
                description:
                    'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
                    'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
                unit:
                    'm',
                unitPrice:
                    0,
                totalPrice:
                    0,
                quantity:
                    896.6
            }
                ,
            {
                id: '108',
                itemNo:
                    'A-4',
                specNo:
                    'PW.2 OPSS 442 SP',
                crew:
                    'Crew4',
                trench:
                {
                    height: 10,
                    width:
                        10,
                    length:
                        10,
                    cubeVolume:
                        1000,
                    diameter:
                        20,
                    pipeVolume:
                        10,
                    totalVolume:
                        100,
                    remaningVolume:
                        0
                }
                ,
                itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
                labours:
                    [],
                equipments:
                    [],
                subcontractors: [
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'ROYAL CASTOR PRODUCTS LIMITED',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'DONGSUH INDUSTRY CO.,LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    },
                    {
                        name: 'GREEN LUBRICANT CO., LTD',
                        subitems: [
                            {
                                id: '0',
                                name: 'Cement',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '1',
                                name: 'IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            },
                            {
                                id: '2',
                                name: 'T-IRON',
                                quantity: 10,
                                unit: 'm',
                                unitPrice: 10,
                                totalPrice: 100
                            }
                        ]
                    }



                ],
                subitems:
                    [
                        { id: '1', name: 'Cement', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
                        { id: '2', name: 'Gloves', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 },
                        { id: '3', name: 'IRON', unit: 'm', unitPrice: 10, quantity: 10, totalPrice: 100 }],
                description:
                    'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
                    'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
                unit:
                    'm',
                unitPrice:
                    0,
                totalPrice:
                    0,
                quantity:
                    896.6
            }
            ]

        }

    ];


    arr = [{
        id: '123',
        items: [{
            //id: '105',
            itemNo: 'A-1',
            specNo: 'PW.2 OPSS 442 SP',
            //crew: 'Crew1',
            /* trench: {
                height: 10,
                width: 10,
                length: 10,
                cubeVolume: 1000,
                diameter: 20,
                pipeVolume: 10,
                totalVolume: 100,
                remaningVolume: 0
            }, */
            //itemName: 'Construction of Watermain, including Temporary Connections for Flushing:',
            //description: 'some description',
            //unit : 'm', quantity: '2.00',

        }]
    }
    ]



    constructor(private http: HttpClient) {
    }

    // Modified by Arup to connect with API : 19-11-2019
    add(tender: Tender): Observable<any> {
        console.log('add  called', tender);
        // const myId = uuid.v4();
        // tender.id = myId;
        // console.log('id added', tender);
        // this.array.unshift(tender);
        // return of([]);
        //
        const keys = Object.keys(tender);
        //
        const formData = new FormData();

        for (let i = 0; i < keys.length; i++) {
            formData.append(keys[i], tender[keys[i]]);
        }
        //
        const createTenderURL = API_URL + '/tenders';
        //

        return this.http.post(createTenderURL, formData);

    }

    update(item) {
        console.log('update called', item);
        this.arr = this.arr.map((tender) => {
            if (tender.id === item.id) {
                return item;
            } else {
                return tender;
            }
        })

        return of([]);
    }

    delete(item) {

        this.array = this.array.filter((tender) => {
            if (tender.id === item.id) {

                return false;
            } else {
                return true;
            }
        })
        return of([]);
    }

    getAll() {
        return of(this.array);
    }

    getTenderById(id) {
        return of(this.array.find((tender) => {
            if (tender.id === id) {
                return true;
            } else {
                return false;
            }
        }));
    }
}
