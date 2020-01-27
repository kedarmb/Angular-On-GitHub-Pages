import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tender-compare',
  templateUrl: './tender-compare.component.html',
  styleUrls: ['./tender-compare.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenderCompareComponent implements OnInit {
  tender = {
    'name': 'tender Pipe line laying',
    'clientRef': '',
    'description': 'String',
    'openDate': 'String',
    'closeDate': 'String',
    'quoteStartDate': 'String',
    'quoteEndDate': 'String',
    'sections': [
      {
        'name': 'section 1',
        'sectionTotal': [{
          'totalPrice': 'Number',
          'quoteSub': 'sf444'
        }],

        'lineItems': [
          {
            'specNo': '561000Sno',
            'itemNo': '981000Ino',
            'name': 'line 3',
            'description': 'String',
            'unit': 'String',
            'quantity': '150',
            'notifiedSubs': [
              '1',
              '2'
            ],
            'selectedSub': [
              '1'
            ],
            'subLineItems': [
              {
                'name': 'String',
                'quotes': [
                  {
                    'unit': 'String',
                    'quantity': '5',
                    'unitPrice': '50',
                    'totalPrice': '250',
                    'quoteSub': 'sf444'
                  }
                ],

                'trenchRef': 'sda5455',
                'crewRef': 'sdf545'
              },
              {
                'name': 'String',
                'quotes': [
                  {
                    'unit': 'String',
                    'quantity': '5',
                    'unitPrice': '50',
                    'totalPrice': '250',
                    'quoteSub': 'sf445'
                  }
                ],

                'trenchRef': 'sda5455',
                'crewRef': 'sdf545'
              }
            ],
            'lineItemTotal': [
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf444'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf445'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf446'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf447'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf448'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf449'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf450'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf451'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf452'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf452'
              }


            ],
          },
          {
            'specNo': '561001Sno',
            'itemNo': '981001Ino',
            'name': 'line 4',
            'description': 'String',
            'unit': 'String',
            'quantity': '300',
            'notifiedSubs': [
              '1',
              '2'
            ],
            'selectedSub': [
              '1'
            ],
            'subLineItems': [
              {
                'name': 'String',
                'quotes': [
                  {
                    'unit': 'String',
                    'quantity': '5',
                    'unitPrice': '50',
                    'totalPrice': '250',
                    'quoteSub': 'sf444'
                  }
                ],
                'trenchRef': 'sda5455',
                'crewRef': 'sdf545'
              },
              {
                'name': 'String',
                'quotes': [
                  {
                    'unit': 'String',
                    'quantity': '5',
                    'unitPrice': '50',
                    'totalPrice': '250',
                    'quoteSub': 'sf445'
                  }
                ],

                'trenchRef': 'sda5455',
                'crewRef': 'sdf545'
              }
            ],
            'lineItemTotal': [
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf444'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf445'
              }
            ],
          }
        ],
        'status': 'Created'
      },
      {
        'name': 'section 2',
        'sectionTotal': [{
          'totalPrice': 'Number',
          'quoteSub': 'sf444'
        }],

        'lineItems': [
          {
            'specNo': '561002Sno',
            'itemNo': '981002Ino',
            'name': 'line 1',
            'description': 'String',
            'unit': 'String',
            'quantity': '800',
            'notifiedSubs': [
              '1',
              '2'
            ],
            'selectedSub': [
              '1'
            ],
            'subLineItems': [
              {
                'name': 'String',
                'quotes': [
                  {
                    'unit': 'String',
                    'quantity': '5',
                    'unitPrice': '50',
                    'totalPrice': '250',
                    'quoteSub': 'sf444'
                  }
                ],

                'trenchRef': 'sda5455',
                'crewRef': 'sdf545'
              },
              {
                'name': 'String',
                'quotes': [
                  {
                    'unit': 'String',
                    'quantity': '5',
                    'unitPrice': '50',
                    'totalPrice': '250',
                    'quoteSub': 'sf445'
                  }
                ],

                'trenchRef': 'sda5455',
                'crewRef': 'sdf545'
              }
            ],
            'lineItemTotal': [
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf444'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf445'
              }
            ],
          },
          {
            'specNo': '561003Sno',
            'itemNo': '981003Ino',
            'name': 'line 2',
            'description': 'String',
            'unit': 'String',
            'quantity': '500',
            'notifiedSubs': [
              '1',
              '2'
            ],
            'selectedSub': [
              '1'
            ],
            'subLineItems': [
              {
                'name': 'String',
                'quotes': [
                  {
                    'unit': 'String',
                    'quantity': '5',
                    'unitPrice': '50',
                    'totalPrice': '250',
                    'quoteSub': 'sf444'
                  }
                ],

                'trenchRef': 'sda5455',
                'crewRef': 'sdf545'
              },
              {
                'name': 'String',
                'quotes': [
                  {
                    'unit': 'String',
                    'quantity': '5',
                    'unitPrice': '50',
                    'totalPrice': '250',
                    'quoteSub': 'sf445'
                  }
                ],

                'trenchRef': 'sda5455',
                'crewRef': 'sdf545'
              }
            ],
            'lineItemTotal': [
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf444'
              },
              {
                'unitPrice': 'Number',
                'totalPrice': 'N  umber',
                'quoteSub': 'sf445'
              }
            ],
          }
        ],
        'status': 'Created'
      }
    ],
    'createdDate': '4564646',
    'createdBy': '6546464664654',
    'updatedDate': '65464646656231',
    'updatedBy': '54646461asdsaas',
    'organizationRef': '45sdfs'
  }
  lineTotal: any;
  selection;

  constructor() { }

  ngOnInit() {
    console.log(this.tender);
    // this.fetchLineTotal();
  }
  fetchLineTotal(sec, lt, slt) {
    this.lineTotal = this.tender.sections[sec].lineItems[lt].lineItemTotal.filter(val => val.quoteSub == slt)
    console.log(this.lineTotal);
  }
  displayedColumns: string[] = ['select', 'SubContractor', 'unitPrice', 'totalPrice'];
 
}
