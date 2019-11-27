import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {TenderItem} from './tender-item.model';
import {Subcontractor} from './subcontractor.model';

export class Tender {
    id = '';
    clientName = '';
    name = '';
    items: TenderItem [] = [];
    quoteStartDate: any ;
    quoteEndDate: any;
    openDate: any ;
    closeDate: any ;
}
