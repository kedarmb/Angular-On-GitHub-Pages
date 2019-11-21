import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Labour from '../../model/labour.model';
import { LabourService } from 'app/service/labour.service';

@Component({
  selector: 'app-labour-modal',
  templateUrl: './labour-modal.component.html',
  styleUrls: ['./labour-modal.component.scss']
})
export class LabourModalComponent implements OnInit {

  @Input('labour')
  labour: Labour;
  placement = 'bottom';
  constructor(public activeModal: NgbActiveModal, private labourService: LabourService) { }

  ngOnInit() {
  }

  close() {
    this.activeModal.close('closed');
  }
     save(labour) {
    if (labour.id) {
      this.labourService.update(102, labour).subscribe(() => {
        this.activeModal.close('closed');
      })
    } else {
      this.labourService.create(labour).subscribe(() => {
        this.activeModal.close('closed');
      })
    }
  }
}
