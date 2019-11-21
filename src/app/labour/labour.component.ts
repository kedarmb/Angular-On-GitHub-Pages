import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LabourService } from 'app/service/labour.service';
import { Router } from '@angular/router';
import { LabourModalComponent } from 'app/modal/labour-modal/labour-modal.component';
import Labour from 'app/model/labour.model';

@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.scss']
})
export class LabourComponent implements OnInit {
  data:any={};
  labour:Array<any>;
  
    constructor(private modalService: NgbModal, private labourService: LabourService, private router: Router) {
    }

    ngOnInit() {
      this.labourService.getAll().subscribe((data) => {
          this.labour = data['data'];
          console.log(data['data'])})
    }

    delete(labour) {
        this.labourService.delete(labour).subscribe(() => {
            this.labourService.getAll().subscribe((labour) => {
                //this.labour = labour;
            })
        })
    }
    

    open(item?) {
        const modalRef = this.modalService.open(LabourModalComponent, {centered: true});
        const obj = {};
        for (const i in item) {
            obj[i] = item[i];
        }
        modalRef.componentInstance.labour = obj || new Labour();
        modalRef.result.then(() => {
            this.labourService.getAll().subscribe((labour) => {
                console.log('.>>>>>>>>>>>>>>>>>>>>>>>>>', labour);
                //this.labour = labour;
            });
        })

    }

    viewTender() {
        this.router.navigateByUrl('view-tender');
    }

}
