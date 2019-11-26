import {CrewItem} from './crew-item.model';

export class Crew {
    id: string;
    description = '';
    name = '';
    labours: CrewItem[] = [];
    equipments: CrewItem[] = [];
}
