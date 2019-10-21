import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TenderService} from '../service/tender.service';
import {Tender} from '../model/tender.model';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit, AfterViewInit {

  tender: Tender;
  contractor = true;
  constructor(private tenderService: TenderService) { }


  ngOnInit() {
     this.tenderService.getTenderById('123').subscribe((tender) => {
        this.tender = tender;
     })
  }

  contractorWise() {
    this.contractor = true;
  }

  lineItemWise() {
    this.contractor = false;
  }
  ngAfterViewInit(): void {
    this.initClickAndDrag();
  }

  initClickAndDrag() {
    const slider = document.querySelector('.items');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = (<any>e).pageX - (<any>slider).offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) { return; }
      e.preventDefault();
      const x = (<any>e).pageX - (<any>slider).offsetLeft;
      const walk = (x - startX) * 3; // scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      console.log(walk);
    });
  }

}
