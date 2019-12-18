import { filter } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationModalComponent } from '../../shared/components/organization-modal/organization-modal.component';
import Organization from '../../shared/core/model/organization.model';
import { HttpService } from '../../shared/core/service/http.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
    displayedColumns: string[] = ['Name', 'Street Address', 'Service Type', 'ServiceArea', 'province', 'Country', 'City', 'Actions'];
    @ViewChild(MatTable, {static:false}) table: MatTable<any>;
    organizations;
    update = {
        data:'',
        val:''
    };

    constructor(private modalService: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef,
        
         private httpService: HttpService, private router: Router) { }
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

    openModal() {
        const modalRef = this.modalService.open(OrganizationModalComponent, {
            height: 'auto',
            width: '35%', data: { modal: this.update }
        });
        modalRef.afterClosed().subscribe(response => {
            if (response.status === 'close') {
                console.log(response.data);
            }
            if (response.status === 'add') {
                console.log(response.data);
                this.organizations.push(response.data);
            }
            if (response.status === 'update') {
                console.log(response.data);
                this.getOrganization() 
                this.table.renderRows();
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
    removeOrg(val, e) {
        this.httpService.deleteOrganization(val._id)
        .subscribe((response: any) => {
            if (response.status === 200) {
                this.organizations.splice(e, 1)
                this.table.renderRows();
                }
            }, error => {
                console.log(error);
            })
    }
    viewTender() {
        this.router.navigateByUrl('view-tender');
    }

}
