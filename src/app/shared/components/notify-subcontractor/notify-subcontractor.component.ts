
import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'app/shared/core/service/http.service';
import Organization from 'app/shared/core/model/organization.model';

@Component({
  selector: 'app-notify-subcontractor',
  templateUrl: './notify-subcontractor.component.html',
  styleUrls: ['./notify-subcontractor.component.scss']
})
export class NotifySubcontractorComponent implements OnInit {

  organizations: Organization[];
  constructor(private activeModal: NgbActiveModal, private httpService: HttpService) { }

  ngOnInit() {
   /* this.httpService.getAll().subscribe((organizations) => {
      this.organizations = organizations;
    })*/
  }
   close() {
    this.activeModal.close('close');
   }
}
