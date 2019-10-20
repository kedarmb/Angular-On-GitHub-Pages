import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {TenderItem} from './tender-item.model';

export class Tender {
    id = '';
    clientName = '';
    name = '';
    items: TenderItem [];
    quoteStartDate: any ;
    quoteEndDate: any;
    openDate: any ;
    closeDate: any ;

}
