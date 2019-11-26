import {Component, OnInit} from '@angular/core';

import { TenderModalComponent } from '../shared/components/tender-modal/tender-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TenderService} from '../service/tender.service';
import {Tender} from '../model/tender.model';
import {ActivatedRoute, Router} from '@angular/router';
import { OrganizationModalComponent } from '../shared/components/organization-modal/organization-modal.component';
import Organization from '../model/organization.model';
import {OrganizationService} from '../service/organization.service';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
    organizations: any;

    ngOnInit() {
        this.organizationService.getAll().subscribe((data) => {
            this.organizations = data['data'];
            console.log(data);
        })
    }


    constructor(private modalService: NgbModal, private organizationService: OrganizationService, private router: Router) {
    }

    delete(organization) {
        this.organizationService.delete(organization).subscribe(() => {
            this.organizationService.getAll().subscribe((organizations) => {
                this.organizations = organizations;
            })
        })
    }

    open(item?) {
        const modalRef = this.modalService.open(OrganizationModalComponent, {centered: true});
        const obj = {};
        for (const i in item) {
            obj[i] = item[i];
        }
        modalRef.componentInstance.organization = obj || new Organization();
        modalRef.result.then(() => {
            this.organizationService.getAll().subscribe((organizations) => {
                console.log('.>>>>>>>>>>>>>>>>>>>>>>>>>', organizations);
                this.organizations = organizations;
            });
        })

    }

    viewTender() {
        this.router.navigateByUrl('view-tender');
    }

}
