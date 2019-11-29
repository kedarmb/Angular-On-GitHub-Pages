import { Component, OnInit } from '@angular/core';
import {Tender} from '../../shared/core/model/tender.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {TenderService} from '../../shared/core/service/tender.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {


  tender: Tender;
  contractor = 1;


  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'CEMENT' },
    { data: [28, 28, 40], label: 'IRON' },
    { data: [28, 38, 40], label: 'T-IRON' },
    { data: [28, 48, 40], label: 'HOOKS' },
    { data: [28, 58, 40], label: 'GLOVES' }
  ];
  public lineChartLabels: Label[] = ['ROYAL CASTOR PRODUCTS LIMITED',
    'DONGSUH INDUSTRY CO.,LTD',
    'GREEN LUBRICANT CO., LTD'];
  public lineChartOptions = {
    title: {
      text: 'A-1/PW.2 OPSS 442 SP',
      display: true
    },
    scales: {
      xAxes: [
        {
          ticks: {
            callback: function(label, index, labels) {
              if (/\s/.test(label)) {
                return label.split(' ');
              } else {
                return label;
              }
            }
          }
        }
      ]
    },
    elements: {
      line: {
        fill: false
      }
    },
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];



  public barChartOptions: ChartOptions = {
    title: {
      text: 'A-1/PW.2 OPSS 442 SP',
      display: true
    },
    scales: {
      xAxes: [
        {
          ticks: {
            callback: function(label, index, labels) {
              if (/\s/.test(label)) {
                return label.split(' ');
              } else {
                return label;
              }
            }
          }
        }
      ]
    },
    responsive: true,
  };
  public barChartLabels: Label[] = ['ROYAL CASTOR PRODUCTS LIMITED',
    'DONGSUH INDUSTRY CO.,LTD',
    'GREEN LUBRICANT CO., LTD'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80], label: 'CEMENT' },
    { data: [28, 48, 40], label: 'IRON' },
    { data: [28, 38, 40], label: 'T-IRON' },
    { data: [28, 28, 40], label: 'HOOKS' },
    { data: [28, 18, 40], label: 'GLOVES' }
  ];

  constructor(private tenderService: TenderService) { }


  ngOnInit() {
    this.tenderService.getTenderById('123').subscribe((tender) => {
      this.tender = tender;
    })
  }


  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {

  }
}
