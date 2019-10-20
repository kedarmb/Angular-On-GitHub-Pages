import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload'
import {TenderService} from '../service/tender.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tender} from '../model/tender.model';
import {TenderItem} from '../model/tender-item.model';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, AfterViewInit {

  pdfSrc: any;

   tender: Tender;
   tenderItem: TenderItem = new TenderItem();
  public previewSrc: string = null;

  constructor(private tenderService: TenderService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.tenderService.getTenderById(params.id).subscribe((tender) => {
        this.tender = tender;
      })
    })
  }
  ngAfterViewInit(): void {
      console.log('+++++++++++++++++++++++', document.getElementsByClassName('textLayer').length);
  }

  public setPreviewFromFile(files: FileList) {

    const reader = new FileReader();

    reader.onloadend = (e: any) => {
      this.pdfSrc = e.target.result;
    };

    reader.readAsArrayBuffer(files.item(0));
  }

  textLayerRendered($event) {
    /*$event.source.textDivs.forEach((elem) => {
      elem.setAttribute('draggable', true);
    })*/
  }

  save() {
      this.tender.items.push(this.tenderItem);
      this.tenderItem = new TenderItem();
  }

  cancel() {
   this.router.navigateByUrl('/tender');
  }



}
