import {CrewItem} from './crew-item.model';

export class Crew {
    id: string;
    description: string;
    name: string;
    labours: CrewItem[] = [];
    equipments: CrewItem[] = [];
}

export interface Engineer {
    name: string;
    _Id: number;
}
