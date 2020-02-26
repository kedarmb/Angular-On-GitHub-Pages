import {NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {TenderItem} from './tender-item.model';
import {Subcontractor} from './subcontractor.model';

export class Tender {
    _id = '';
    clientName = '';
    tenderName = '';
    items: TenderItem [] = [];
    quoteStartDate: any ;
    quoteEndDate: any;
    openDate: any ;
    closeDate: any ;
    submissionMode: string;
}
