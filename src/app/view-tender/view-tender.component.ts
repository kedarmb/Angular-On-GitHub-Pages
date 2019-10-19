import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TrenchModalComponent} from '../modal/trench-modal/trench-modal.component';
import {CrewModalComponent} from '../modal/crew-modal/crew-modal.component';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-view-tender',
  templateUrl: './view-tender.component.html',
  styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent implements OnInit {

  accordion = {};

  tender = {
    openDate: '23/07/2019',
    closeDate: '22/10/2010',
    quoteStartDate: '23/12/1234',
    quoteEndDate: '23/3/0987',
    name: 'Real time Generating',
    items: [{
      'itemNo': 'A-1',
      'specNo': 'PW.2 OPSS 442 SP',
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
      'itemName': 'Construction of Watermain, including Temporary Connections for Flushing:',
       'labours': [{name: 'Foreman', price: '$56.45', hour: 13},
         {name: 'Pipelayer', price: '$56.45', hour: 10},
         {name: 'Surveyor', price: '$56.45', hour: 3},
         {name: 'Truck Driver', price: '$56.45', hour: 4}],
      'equipments': [{name: 'Float', price: '$23.23', hour: 10},
        {name: 'Sweeper', price: '$23.23', hour: 12},
        {name: 'Triaxle', price: '$23.23', hour: 12},
        {name: 'Hammer', price: '$23.23', hour: 13}],
      'subitems': [
          {name: 'Cement', unitPrice: 10, quantity: 10, totalPrice: 100},
        {name: 'Gloves', unitPrice: 10, quantity: 10, totalPrice: 100},
        {name: 'IRON', unitPrice: 10, quantity: 10, totalPrice: 100}],
      'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
          'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
      'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
      'quantity': '896.6'},
      {
      'itemNo': 'A-1',
      'specNo': 'PW.2 OPSS 442 SP',
      trench: {
        height: 10,
        width: 10,
        length: 10,
        cubeVolume: 1000,
        diameter: 20,
        pipeVolume: 10,
        totalVolume: 100, remaningVolume: 0
      },
      'itemName': 'Construction of Watermain, including Temporary Connections for Flushing:',
      'labours': [{name: 'Foreman', price: '$56.45', hour: 13},
        {name: 'Pipelayer', price: '$56.45', hour: 10},
        {name: 'Surveyor', price: '$56.45', hour: 3},
        {name: 'Truck Driver', price: '$56.45', hour: 4}],
      'equipments': [{name: 'Float', price: '$23.23', hour: 10},
        {name: 'Sweeper', price: '$23.23', hour: 12},
        {name: 'Triaxle', price: '$23.23', hour: 12},
        {name: 'Hammer', price: '$23.23', hour: 13}],
      'subitems': [
        {name: 'Cement', unitPrice: 10, quantity: 10, totalPrice: 100},
        {name: 'Gloves', unitPrice: 10, quantity: 10, totalPrice: 100},
        {name: 'IRON', unitPrice: 10, quantity: 10, totalPrice: 100}],
      'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
          'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
      'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
      'quantity': '896.6'},
      {
      'itemNo': 'A-1',
      'specNo': 'PW.2 OPSS 442 SP',
      trench: {
        height: 10,
        width: 10,
        length: 10,
        cubeVolume: 1000,
        diameter: 20,
        pipeVolume: 10,
        totalVolume: 100, remaningVolume: 0
      },
      'itemName': 'Construction of Watermain, including Temporary Connections for Flushing:',
      'labours': [{name: 'Foreman', price: '$56.45', hour: 13},
        {name: 'Pipelayer', price: '$56.45', hour: 10},
        {name: 'Surveyor', price: '$56.45', hour: 3},
        {name: 'Truck Driver', price: '$56.45', hour: 4}],
      'equipments': [{name: 'Float', price: '$23.23', hour: 10},
        {name: 'Sweeper', price: '$23.23', hour: 12},
        {name: 'Triaxle', price: '$23.23', hour: 12},
        {name: 'Hammer', price: '$23.23', hour: 13}],
      'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
          'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
      'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
      'quantity': '896.6'},
      {
      'itemNo': 'A-1',
      'specNo': 'PW.2 OPSS 442 SP',
      trench: {
        height: 10,
        width: 10,
        length: 10,
        cubeVolume: 1000,
        diameter: 20,
        pipeVolume: 10,
        totalVolume: 100, remaningVolume: 0
      },
      'itemName': 'Construction of Watermain, including Temporary Connections for Flushing:',
      'labours': [{name: 'Foreman', price: '$56.45', hour: 13},
        {name: 'Pipelayer', price: '$56.45', hour: 10},
        {name: 'Surveyor', price: '$56.45', hour: 3},
        {name: 'Truck Driver', price: '$56.45', hour: 4}],
      'equipments': [{name: 'Float', price: '$23.23', hour: 10},
        {name: 'Sweeper', price: '$23.23', hour: 12},
        {name: 'Triaxle', price: '$23.23', hour: 12},
        {name: 'Hammer', price: '$23.23', hour: 13}],
      'subitems': [
        {name: 'Cement', unitPrice: 10, quantity: 10, totalPrice: 100},
        {name: 'Gloves', unitPrice: 10, quantity: 10, totalPrice: 100},
        {name: 'IRON', unitPrice: 10, quantity: 10, totalPrice: 100}],
      'description': 'a) Supply and Installation of Proposed 600mm Diameter AWWA C301 CPP Watermain ' +
          'on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
      'unit': 'm', 'unitPrice': 0, 'totalPrice': 0,
      'quantity': '896.6'}]

  }

  model: any;
  searching = false;
  searchFailed = false;

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

  toggleCollapse(index) {
    this.accordion[index] = !this.accordion[index]
  }

  delete(index) {
    this.tender.items.splice(index, 1);
  }
  add() {
    this.tender.items.push({itemNo: '',
      specNo: '',
      itemName: '',
      description: '',
      unit: '',
      quantity: '0',
      totalPrice: 0,
      unitPrice: 0,
      trench: {height: 0, width: 0, length: 0, cubeVolume: 0, totalVolume: 0, pipeVolume : 0, diameter: 0, remaningVolume: 0},
      labours: [{name: '', price: '$0', hour: 0}],
      equipments: [{name: '', price: '$3', hour: 0}]});
  }
  addSubitem(item) {
    item.subitems.unshift({name: '', unitPrice: 0, quantity: 0, totalPrice: 0});
  }
  deleteSubitem(item, index) {
    item.subitems.splice(index, 1);
  }

  search = (text$: Observable<string>) =>
      text$.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() => this.searching = true),
          switchMap(term =>   of([])),
          tap(() => this.searching = false)
      )

}
