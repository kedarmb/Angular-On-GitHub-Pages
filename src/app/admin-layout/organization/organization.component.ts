import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import { OrganizationModalComponent } from '../../shared/components/organization-modal/organization-modal.component';
import Organization from '../../shared/core/model/organization.model';
import {HttpService} from '../../shared/core/service/http.service';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
    organizations: any;

    ngOnInit() {
        this.httpService.getAllOrganization().subscribe((data) => {
            this.organizations = data['data'];
            console.log(data);
        })
    }


    constructor(private modalService: NgbModal, private httpService: HttpService, private router: Router) {
    }

    delete(organization) {
        this.httpService.deleteOrganization(organization).subscribe(() => {
            this.httpService.getAllOrganization().subscribe((organizations) => {
                this.organizations = organizations;
            })
        })
    }

    open(item?) {
        const modalRef = this.modalService.open(OrganizationModalComponent, {centered: true});
        const obj = {};
            // tslint:disable-next-line: forin
            for (const i in item) {
                obj[i] = item[i];
            }
        modalRef.componentInstance.organization = obj || new Organization();
        modalRef.result.then(() => {
            this.httpService.getAllOrganization().subscribe((organizations) => {
                console.log('.>>>>>>>>>>>>>>>>>>>>>>>>>', organizations);
                this.organizations = organizations;
            });
        })

    }

    viewTender() {
        this.router.navigateByUrl('view-tender');
    }

}
