import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {TrenchModalComponent} from '../modal/trench-modal/trench-modal.component';
import {CrewModalComponent} from '../modal/crew-modal/crew-modal.component';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';


@Component({
  selector: 'app-view-tender',
  templateUrl: './view-tender.component.html',
  styleUrls: ['./view-tender.component.scss']
})
export class ViewTenderComponent {

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
   states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


  @ViewChild('instance', {static: true})
  instance: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private modalService: NgbModal) { }




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

  public searchFunctionFactory(instance: any): (text: Observable<string>) => Observable<any[]> {



    const getCities = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !instance.isPopupOpen()));
      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
          map(term => (term === '' ? this.states
              : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    }


    return getCities;
  }

  search = (text$: Observable<string>) => {
    console.log('+++++++++++++++', this.instance);
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? this.states
            : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

}
