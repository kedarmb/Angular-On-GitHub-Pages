import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationModalComponent } from '../../shared/components/organization-modal/organization-modal.component';
import Organization from '../../shared/core/model/organization.model';
import { HttpService } from '../../shared/core/service/http.service';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
    organizations: any;
    constructor(private modalService: NgbModal, private httpService: HttpService, private router: Router) {}
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

    open() {
        const modalRef = this.modalService.open(OrganizationModalComponent, { centered: true });
        // const obj = {};
        // tslint:disable-next-line: forin
        // for (const i in item) {
        //     obj[i] = item[i];
        // }
        // modalRef.componentInstance.organization = obj || new Organization();
        modalRef.result.then(() => {
        this.getOrganization();
        })

    }

    viewTender() {
        this.router.navigateByUrl('view-tender');
    }

}
