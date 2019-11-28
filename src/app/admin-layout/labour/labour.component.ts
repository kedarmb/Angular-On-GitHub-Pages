import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'app/shared/core/service/http.service';
import { Router } from '@angular/router';

import Labour from 'app/shared/core/model/labour.model';

@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.scss']
})
export class LabourComponent implements OnInit {
  data:any={};
  labour:Array<any>;

    constructor(private modalService: NgbModal, private httpService: HttpService, private router: Router) {
    }

    ngOnInit() {
      this.httpService.getAllLabour().subscribe((data) => {
          this.labour = data['data'];
          console.log(data['data'])})
    }

    delete(labour) {
        this.httpService.deleteLabour(labour).subscribe(() => {
            this.httpService.getAllLabour().subscribe((labour) => {
                //this.labour = labour;
            })
        })
    }


    open(item?) {
        const modalRef = this.modalService.open('', {centered: true});
        const obj = {};
        for (const i in item) {
            obj[i] = item[i];
        }
        modalRef.componentInstance.labour = obj || new Labour();
        modalRef.result.then(() => {
            this.httpService.getAllLabour().subscribe((labour) => {
                console.log('.>>>>>>>>>>>>>>>>>>>>>>>>>', labour);
                //this.labour = labour;
            });
        })

    }

    viewTender() {
        this.router.navigateByUrl('view-tender');
    }

}
