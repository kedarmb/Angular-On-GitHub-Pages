import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Organization from '../model/organization.model';
import {of} from 'rxjs';
import {Tender} from '../model/tender.model';
import * as uuid from 'uuid';

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
      name: 'Real time Generating',
      clientName: 'Aaskash Builder Pvt Ltd',
      items: [{
        id: '105',
        itemNo: 'A-1',
        specNo: 'PW.2 OPSS 442 SP',
        crew: '201',
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
        labours: [{id: '100', name: 'Foreman', price: 56.45, hour: 13},
          {id: '101', name: 'Pipelayer', price: 56.45, hour: 10},
          {id: '102', name: 'Surveyor', price: 56.45, hour: 3},
          {id: '103', name: 'Truck Driver', price: 56.45, hour: 4}],
        equipments: [{id: '104', name: 'Float', price: 23.23, hour: 10},
          {id: '105', name: 'Sweeper', price: 23.23, hour: 12},
          {id: '106', name: 'Triaxle', price: 23.23, hour: 12},
          {id: '107', name: 'Hammer', price: 23.23, hour: 13}],
        subitems: [
          {name: 'Cement', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100},
          {name: 'Gloves', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100},
          {name: 'IRON', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100}],
        description: 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
            'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
        unit: 'm',
        unitPrice: 0,
        totalPrice: 0,
        quantity: 896.6},
        {
          id: '106',
          itemNo: 'A-2',
          specNo: 'PW.2 OPSS 442 SP',
          crew: '202',
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
          labours: [{id: '100', name: 'Foreman', price: 56.45, hour: 13},
            {id: '101', name: 'Pipelayer', price: 56.45, hour: 10},
            {id: '102', name: 'Surveyor', price: 56.45, hour: 3},
            {id: '103', name: 'Truck Driver', price: 56.45, hour: 4}],
          equipments: [{id: '104', name: 'Float', price: 23.23, hour: 10},
            {id: '105', name: 'Sweeper', price: 23.23, hour: 12},
            {id: '106', name: 'Triaxle', price: 23.23, hour: 12},
            {id: '107', name: 'Hammer', price: 23.23, hour: 13}],
          subitems: [
            {name: 'Cement', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100},
            {name: 'Gloves', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100},
            {name: 'IRON', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100}],
          description: 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
              'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
          unit: 'm',
          unitPrice: 0,
          totalPrice: 0,
          quantity: 896.6},
        {
          id: '107',
          itemNo: 'A-3',
          specNo: 'PW.2 OPSS 442 SP',
          crew: '203',
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
          labours: [{id: '100', name: 'Foreman', price: 56.45, hour: 13},
            {id: '101', name: 'Pipelayer', price: 56.45, hour: 10},
            {id: '102', name: 'Surveyor', price: 56.45, hour: 3},
            {id: '103', name: 'Truck Driver', price: 56.45, hour: 4}],
          equipments: [{id: '104', name: 'Float', price: 23.23, hour: 10},
            {id: '105', name: 'Sweeper', price: 23.23, hour: 12},
            {id: '106', name: 'Triaxle', price: 23.23, hour: 12},
            {id: '107', name: 'Hammer', price: 23.23, hour: 13}],
          subitems: [
            {name: 'Cement', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100},
            {name: 'Gloves', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100},
            {name: 'IRON', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100}],
          description: 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
              'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
          unit: 'm',
          unitPrice: 0,
          totalPrice: 0,
          quantity: 896.6},
        {
          id: '108',
          itemNo: 'A-4',
          specNo: 'PW.2 OPSS 442 SP',
          crew: '204',
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
          labours: [{id: '100', name: 'Foreman', price: 56.45, hour: 13},
            {id: '101', name: 'Pipelayer', price: 56.45, hour: 10},
            {id: '102', name: 'Surveyor', price: 56.45, hour: 3},
            {id: '103', name: 'Truck Driver', price: 56.45, hour: 4}],
          equipments: [{id: '104', name: 'Float', price: 23.23, hour: 10},
            {id: '105', name: 'Sweeper', price: 23.23, hour: 12},
            {id: '106', name: 'Triaxle', price: 23.23, hour: 12},
            {id: '107', name: 'Hammer', price: 23.23, hour: 13}],
          subitems: [
            {name: 'Cement', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100},
            {name: 'Gloves', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100},
            {name: 'IRON', unit: 0, unitPrice: 10, quantity: 10, totalPrice: 100}],
          description: 'a) Supply and Installation of Proposed 600mm Diameter AWWA ' +
              'C301 CPP Watermain on Mayfield Road (Sta. 12+772.3 to Sta.13+656.8) [Dwg. 68331-D to 68335-D]',
          unit: 'm',
          unitPrice: 0,
          totalPrice: 0,
          quantity: 896.6}
      ]

    }

      ];
  constructor() { }

  public add(tender: Tender) {
    console.log('add  called', tender);
    const myId = uuid.v4();
    tender.id = myId;
    this.array.unshift(tender);
    return of([]);

  }

  public update(item) {
        console.log('update called', item);
    this.array = this.array.map((tender) => {
      if (tender.id === item.id) {
        return item;
      } else {
        return tender;
      }
    })

    return of([]);
  }

  public delete(item) {

    this.array = this.array.filter((tender) => {
      if (tender.id === item.id) {

        return false;
      }  else {
        return true;
      }
    })
    return of([]);
  }

  public getAll() {
    return of(this.array);
  }

  getTenderById(id) {
    return of( this.array.find((tender) => {
      if (tender.id === id) {
        return true;
      } else {
        return false;
      }
    }));
  }
}
