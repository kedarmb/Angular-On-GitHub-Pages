import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationModalComponent } from '../../shared/components/organization-modal/organization-modal.component';
import Organization from '../../shared/core/model/organization.model';
import { HttpService } from '../../shared/core/service/http.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
    displayedColumns: string[] = ['Name', 'Street Address', 'Service Type', 'ServiceArea', 'province', 'Country', 'City', 'Actions'];
    organizations: any;
    update = {
        data:'',
        val:''
    };
    constructor(private modalService: MatDialog, private httpService: HttpService, private router: Router) { }
    ngOnInit() {
        this.getOrganization()
    }
    getOrganization() {
        this.httpService.getAllOrganization()
            .subscribe((response: any) => {
                if (response.status === 200) {
                    console.log(response.body);
                    this.organizations = response.body;
                }
            }, error => {
                console.log(error);
            })
    }

    delete(organization) {
        this.httpService.deleteOrganization(organization).subscribe(() => {
            this.httpService.getAllOrganization()
                .subscribe((organizations) => {
                    this.organizations = organizations;
                })
        })
    }

    openModal() {
        const modalRef = this.modalService.open(OrganizationModalComponent, {
            height: 'auto',
            width: '35%', data: { modal: this.update }
        });
        modalRef.afterClosed().subscribe(response => {
            if (response.status === true) {
                console.log(response.data);
                this.organizations = response.data;
            }
        });

    }
    addOrg(val) {
        this.update.val = val
        this.openModal();

    }
    updateOrg(val, data) {
        this.update.val = val
        this.update.data = data
        this.openModal();
    }

    viewTender() {
        this.router.navigateByUrl('view-tender');
    }

}
