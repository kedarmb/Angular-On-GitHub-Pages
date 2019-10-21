import {Trench} from './trench.model';
import {TenderSubitem} from './tender-subitem.model';
import {CrewItem} from './crew-item.model';

export class TenderItem {
    id = '';
    itemNo = '';
    itemName = '';
    specNo = '';
    description = '';
    trench: Trench = new Trench();
    labours: CrewItem[] = [];
    equipments: CrewItem[] = [];
    subitems: TenderSubitem[] = [];
    unit = '';
    quantity = 0;
    unitPrice = 0;
    totalPrice = 0;
    crew = '';
}
