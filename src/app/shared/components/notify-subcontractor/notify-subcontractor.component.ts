
import { Component, OnInit, Inject } from '@angular/core';
// import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'app/shared/core/service/http.service';
import Organization from 'app/shared/core/model/organization.model';

@Component({
  selector: 'app-notify-subcontractor',
  templateUrl: './notify-subcontractor.component.html',
  styleUrls: ['./notify-subcontractor.component.scss'],
  // providers: [MatDialogRef]
})
export class NotifySubcontractorComponent implements OnInit {

  organizations: Array<any> = [];
  constructor(/* private activeModal: NgbActiveModal, */ private httpService: HttpService,
    public subContDialogueRef: MatDialogRef<NotifySubcontractorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.organizations = [{ name: 'Subcontractor A' }, { name: 'Subcontractor B' }, { name: 'Subcontractor C' }]
  }

  ngOnInit() {
    /* this.httpService.getAll().subscribe((organizations) => {
       this.organizations = organizations;
     })*/
  }
  close() {
    this.subContDialogueRef.close(this.data);
    console.log('dialog closed ', this.data)
  }
}
