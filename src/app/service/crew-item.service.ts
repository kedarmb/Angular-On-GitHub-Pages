import { Injectable } from '@angular/core';
import {CrewItem} from '../model/crew-item.model';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrewItemService {

  labours: CrewItem[] = [
      {id: '100', name: 'Foreman', price: 94.61 },
     {id: '101', name: 'Pipelayer', price: 64.61 },
     {id: '102', name: 'Labourer', price: 64.61 },
     {id: '103', name: 'Pipelayer Helper ', price: 94.12 },
     {id: '104', name: 'Operator ', price: 54.61},
     {id: '105', name: 'Truck Driver', price: 84.61},
     {id: '106', name: 'Surveyor', price: 34.61}
     ];

  equipments: CrewItem[] = [
    {id: '111', name: 'CAT 311', price: 94.61 },
    {id: '112', name: 'CAT 345', price: 64.61 },
    {id: '113', name: 'Pick up/Van', price: 64.61 },
    {id: '114', name: 'CAT 262 ', price: 94.12 },
    {id: '115', name: 'Sweeper ', price: 54.61},
    {id: '116', name: 'CAT 328', price: 84.61},
    {id: '117', name: 'CAT 305', price: 34.61},
    {id: '118', name: 'Hammer', price: 94.61},
    {id: '119', name: 'CASE 580', price: 24.61},
    {id: '120', name: 'Deere 410J', price: 44.61},
    {id: '121', name: 'Float', price: 24.61}

  ]
  constructor() { }

  getAllLabour() {
    return  of(this.labours);
  }
  getAllEquipments() {
    return of(this.equipments);
  }
}
