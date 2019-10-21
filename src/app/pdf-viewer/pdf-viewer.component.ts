import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import { FileUploader } from 'ng2-file-upload'
import {TenderService} from '../service/tender.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tender} from '../model/tender.model';
import {TenderItem} from '../model/tender-item.model';
import * as uuid from 'uuid';
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

  constructor(private tenderService: TenderService,
              private activatedRoute: ActivatedRoute,
              private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.tenderService.getTenderById(params.id).subscribe((tender) => {
        this.tender = tender;
      })
    })
  }
  ngAfterViewInit(): void {
     const containers = document.getElementsByClassName('nav-item');
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      container.addEventListener('dragover', this.dragover)
      container.addEventListener('dragenter', this.dragenter)
      container.addEventListener('drop', this.drop)
    }
  }

  public setPreviewFromFile(files: FileList) {

    const reader = new FileReader();

    reader.onloadend = (e: any) => {
      this.pdfSrc = e.target.result;
    };

    reader.readAsArrayBuffer(files.item(0));
  }

  textLayerRendered($event) {
    $event.source.textDivs.forEach((elem) => {
      const uid = uuid.v4();
      elem.style.border = '1px solid red';
      elem.setAttribute('id', uid);
      elem.setAttribute('draggable', true);
      elem.addEventListener('dragstart', this.dragstart);
    })
  }

  save() {
      const uid = uuid.v4();
      this.tenderItem.id = uid;
      this.tender.items.push(this.tenderItem);
      this.tenderItem = new TenderItem();
  }

  cancel() {
   this.router.navigateByUrl('/tender');
  }
  dragover(e) {

    e.preventDefault();
  }
  dragenter(e) {

    e.preventDefault();
  }

  drop = (e) => {

     this.ngZone.run(() => {
       const id = e.dataTransfer.getData('text')
       const value = e.dataTransfer.getData('value');
       this.tenderItem[e.target.name] += value;
       document.getElementById(id).remove();
     })
  }

   dragstart(e) {
    e.dataTransfer.setData('text', e.target.id);
    e.dataTransfer.setData('value', e.target.innerHTML);


   }




}
