import { HelperService } from 'app/shared/core/service/helper.service';
import { HttpService } from 'app/shared/core/service/http.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { LabourModalComponent } from 'app/shared/components/labour-modal/labour-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-crew-labour',
  templateUrl: './crew-labour.component.html',
  styleUrls: ['./crew-labour.component.scss']
})
export class CrewLabourComponent implements OnInit {
  valueChange: any;
  labour
  constructor(private modalService: MatDialog, private httpService: HttpService, private helperService: HelperService) { }

  ngOnInit() {
    this.getLabourData()
  }

  getLabourData() {
    this.httpService.getAllLabour().subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.labour = response.body
          console.log(response.body);
          this.helperService.getLabourData(this.labour);
        }
      },
      error => {
        console.log(error);
      }
    )
  };


  openAddLabourModal() {
    const modalRef = this.modalService.open(LabourModalComponent, {
      height: 'auto',
      width: '35%'
    });
    modalRef.afterClosed().subscribe((response) => {
      console.log(response);
      this.labour.push(response);

    })
  }
}
