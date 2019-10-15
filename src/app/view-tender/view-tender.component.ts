import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TrenchModalComponent} from '../modal/trench-modal/trench-modal.component';
import {CrewModalComponent} from '../modal/crew-modal/crew-modal.component';

@Component({
  selector: 'app-view-tender',
  templateUrl: './view-tender.component.html',
  styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit {


  tender = {
    openDate: '23/07/2019',
    closeDate: '22/10/2010',
    quoteStartDate: '23/12/1234',
    quoteEndDate: '23/3/0987',
    name: 'Real time Generating',
    items: [{
      'itemNo': 'A-1',
      'specNo': 'PW.2 OPSS 442 SP',
      'itemName': 'Construction of Watermain, including Temporary Connections for Flushing:',
       'labour': [{name: 'Foreman', price: '$56.45'},
         {name: 'Pipelayer', price: '$56.45'},
         {name: 'Surveyor', price: '$56.45'},
         {name: 'Truck Driver', price: '$56.45'}],
      'equipments': [{name: 'Float', price: '$23.23'},
        {name: 'Sweeper', price: '$23.23'},
        {name: 'Triaxle', price: '$23.23'},
        {name: 'Hammer', price: '$23.23'}],
       subitems: [{'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
             'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
         'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
         'quantity': '896.6'},
         {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
               'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
           'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
           'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
               'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
           'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
           'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
               'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
           'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
           'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
               'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
           'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
           'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
               'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
           'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
           'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
               'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
           'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
           'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
               'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
           'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
           'quantity': '896.6'}]
    },
      {
        'itemNo': 'A-2',
        'specNo': 'PW.2 OPSS 442 SP',
        'itemName': 'Construction of Watermain, including Temporary Connections for Flushing:',
        'labour': [{name: 'Foreman', price: '$56.45'},
          {name: 'Pipelayer', price: '$56.45'},
          {name: 'Surveyor', price: '$56.45'},
          {name: 'Truck Driver', price: '$56.45'}],
        'equipments': [{name: 'Float', price: '$23.23'},
          {name: 'Sweeper', price: '$23.23'},
          {name: 'Triaxle', price: '$23.23'},
          {name: 'Hammer', price: '$23.23'}],
        subitems: [{'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
              'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
          'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
          'quantity': '896.6'},
          {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}]
      },
      {
        'itemNo': 'A-3',
        'specNo': 'PW.2 OPSS 442 SP',
        'itemName': 'Construction of Watermain, including Temporary Connections for Flushing:',
        'labour': [{name: 'Foreman', price: '$56.45'},
          {name: 'Pipelayer', price: '$56.45'},
          {name: 'Surveyor', price: '$56.45'},
          {name: 'Truck Driver', price: '$56.45'}],
        'equipments': [{name: 'Float', price: '$23.23'},
          {name: 'Sweeper', price: '$23.23'},
          {name: 'Triaxle', price: '$23.23'},
          {name: 'Hammer', price: '$23.23'}],
        subitems: [{'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
              'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
          'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
          'quantity': '896.6'},
          {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}, {'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
                'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
            'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
            'quantity': '896.6'}]
      }

    ]
  }

  constructor(private modalService: NgbModal) { }



  ngOnInit() {
  }
  save() {

  }
  trench(item) {
    const modalRef = this.modalService.open(TrenchModalComponent, {centered: true});
  }

  crew(item) {
  const modalRef = this.modalService.open(CrewModalComponent, {centered: true, size: 'lg'});
  }

}
