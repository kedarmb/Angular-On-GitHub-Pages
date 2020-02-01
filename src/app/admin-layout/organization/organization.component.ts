import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationModalComponent } from '../../shared/components/organization-modal/organization-modal.component';
import { HttpService } from '../../shared/core/service/http.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})

export class OrganizationComponent implements OnInit {
    displayedColumns: string[] = ['Name', 'Email', 'Phone', 'Type', 'Street Address', 'Service Type',
        'ServiceArea', 'province', 'Country', 'City', 'Actions'];
    @ViewChild(MatTable, { static: false }) table: MatTable<any>;
    organizations;
    update = {
        data: '',
        val: '',
        id: ''
    };

    constructor(private modalService: MatDialog,
        private httpService: HttpService, private router: Router,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.getOrganization()
    }

    getOrganization() {
        this.httpService.getAllOrganization()
            .subscribe((response: any) => {
                if (response.status === 200) {
                    this.organizations = response.body.reverse();
                }
            }, error => {
                this.toastr.error(error.error.message)
            })
    }

    openModal() {
        const modalRef = this.modalService.open(OrganizationModalComponent, {
            height: 'auto',
            width: '35%', data: this.update, disableClose: true
        });
        modalRef.afterClosed().subscribe(response => {
            if (response.status === 'close' || response.status === undefined) {
            }
            if (response.status === 'add') {
                this.organizations.unshift(response.data);
                this.table.renderRows();
            }
            if (response.status === 'update') {
                this.table.renderRows();
                this.organizations[response.id] = response.data;
                console.log(this.organizations[response.id])
            }
        });
    }

    addOrg(val) {
        this.update.val = val
        this.openModal();
    }

    updateOrg(val, data, id?) {
        this.update.val = val
        this.update.data = data
        this.update.id = id
        console.log(this.organizations[id])
        this.openModal();
    }

    removeOrg(val, e) {
        this.httpService.deleteOrganization(val._id)
            .subscribe((response: any) => {
                if (response.status === 200) {
                    this.organizations.splice(e, 1)
                    this.table.renderRows();
                    this.toastr.success('Removed Successfully')
                }
            }, error => {
                this.toastr.error(error.error.message)
            })
    }

    viewTender() {
        this.router.navigateByUrl('view-tender');
    }
}
