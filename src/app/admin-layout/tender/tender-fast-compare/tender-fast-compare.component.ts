import { HttpService } from './../../../shared/core/service/http.service';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-tender-fast-compare',
  templateUrl: './tender-fast-compare.component.html',
  styleUrls: ['./tender-fast-compare.component.scss']
})
export class TenderFastCompareComponent implements OnInit, OnChanges {
  tenderData: any;
  sublineData: Object;

  constructor(private router: Router, private httpService: HttpService) {
    this.tenderData = this.router.getCurrentNavigation().extras.state;
    console.log(this.tenderData);
    // router.events
    //   .subscribe((event: NavigationStart) => {
    //     if (event.navigationTrigger === 'popstate') {
    //       // Perform actions
    //       this.router.navigate(['/tender'])
    //       console.log(event);
    //     }
    //   });
  }

  ngOnInit() {
    this.getQuotes()

  }

  ngOnChanges(): void {
    fromEvent(window, 'popstate')
      .subscribe((e) => {
        console.log(e, 'back button');
      });
  }
  getTenderByID() {

  }

  getQuotes() {
    this.httpService.getUniqueSubline(this.tenderData).subscribe((response) => {
      if (response.status === 201) {
        this.sublineData = response.body;
        console.log(this.sublineData)
      }
    },
      (err) => {
        console.log('Error getting Tender by id ', err);
      })

  }

}
