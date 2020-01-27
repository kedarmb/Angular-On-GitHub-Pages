
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
  [x: string]: any;

  organizations: any = [];
  constructor(/* private activeModal: NgbActiveModal, */ private httpService: HttpService,
    public subContDialogueRef: MatDialogRef<NotifySubcontractorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    this.getOrganization();
      /*
        this.httpService.getAll().subscribe((organizations) => {
        this.organizations = organizations;
      })*/
      // this.organizations = [{ name: 'Subcontractor A' }, { name: 'Subcontractor B' }, { name: 'Subcontractor C' }]
  }
  getOrganization() {
    this.httpService.getAllOrganization()
      .subscribe((response: any) => {
        if (response.status === 200) {
          const organizations = response.body;
          console.log(organizations)
            this.organizations =  organizations.filter((obj) => {
                if (obj.orgType[0] === 'Prime') {
                  return obj
                }
              })

          console.log('org:', this.organizations);
        }
      }, error => {
        this.toastr.error(error.error.message)
      })
  }
  close() {
    this.subContDialogueRef.close(this.data);
    console.log('dialog closed ', this.data)
  }
}
