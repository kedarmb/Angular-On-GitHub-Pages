import { Trench } from './trench.model';
import { TenderSubitem } from './tender-subitem.model';
import { CrewItem } from './crew-item.model';
import { Subcontractor } from './subcontractor.model';
import Labour from './labour.model';
import Equipments from './equipments.model';

export class TenderItem {
    id = '';
    itemNo = '';
    itemName = '';
    specNo = '';
    description = '';
    trench: Trench = new Trench();
    labours: Labour[] = [];
    equipments: Equipments[] = [];
    subitems: TenderSubitem[] = [];
    unit = '';
    quantity = 0;
    unitPrice = 0;
    totalPrice = 0;
    crew = '';
    subcontractors: Subcontractor[];
}
