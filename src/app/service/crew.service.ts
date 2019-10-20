import {Injectable} from '@angular/core';
import {Crew} from '../model/crew.model';
import {of} from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class CrewService {

    array: Crew[] = [
        {
            id: '201',
            name: 'Crew1',
            description: 'crew1',
            labours: [
                {id: '100', name: 'Foreman', price: 94.61},
                {id: '101', name: 'Pipelayer', price: 64.61},
                {id: '102', name: 'Labourer', price: 64.61}],
            equipments: [
                {id: '111', name: 'CAT 311', price: 94.61},
                {id: '112', name: 'CAT 345', price: 64.61},
                {id: '113', name: 'Pick up/Van', price: 64.61}]
        },
        {
            id: '202',
            name: 'Crew2',
            description: 'crew2',
            labours: [
                {id: '102', name: 'Labourer', price: 64.61},
                {id: '103', name: 'Pipelayer Helper ', price: 94.12}],
            equipments: [
                {id: '117', name: 'CAT 305', price: 34.61},
                {id: '117', name: 'Hammer', price: 94.61},
                {id: '117', name: 'CASE 580', price: 24.61},
                {id: '117', name: 'Deere 410J', price: 44.61},
                {id: '117', name: 'Float', price: 24.61}]
        },
        {
            id: '203',
            name: 'Crew3',
            description: 'crew3',
            labours: [
                {id: '100', name: 'Foreman', price: 94.61},
                {id: '101', name: 'Pipelayer', price: 64.61},
                {id: '102', name: 'Labourer', price: 64.61}],
            equipments: [
                {id: '113', name: 'Pick up/Van', price: 64.61},
                {id: '114', name: 'CAT 262 ', price: 94.12},
                {id: '115', name: 'Sweeper ', price: 54.61},
                {id: '116', name: 'CAT 328', price: 84.61}]
        },
        {
            id: '204',
            name: 'Crew4',
            description: 'crew4',
            labours: [
                {id: '104', name: 'Operator ', price: 54.61},
                {id: '105', name: 'Truck Driver', price: 84.61},
                {id: '106', name: 'Surveyor', price: 34.61}],
            equipments: [
                {id: '117', name: 'CAT 305', price: 34.61},
                {id: '117', name: 'Hammer', price: 94.61},
                {id: '117', name: 'CASE 580', price: 24.61},
                {id: '117', name: 'Deere 410J', price: 44.61},
                {id: '117', name: 'Float', price: 24.61}]
        }
    ]

    constructor() {
    }

    getAll() {
        return of(this.array);
    }

    update(item) {
        this.array = this.array.map((crew) => {
            if (crew.id === item.id) {
                return item;
            } else {
                return crew;
            }
        })

        return of([]);
    }

    delete(item) {
        this.array = this.array.filter((crew) => {
            if (crew.id === item.id) {

                return false;
            } else {
                return true;
            }
        })
        return of([]);
    }

    add(crew) {
        const myId = uuid.v4();
        crew.id = myId;
        this.array.unshift(crew);
        return of([]);
    }
    getCrewById(id) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',id);
        return this.array.find((crew) => {
             if (crew.id === id) { return true; } else { return false; }
        })
    }
}
