import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tender-bid',
  templateUrl: './tender-bid.component.html',
  styleUrls: ['./tender-bid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenderBidComponent implements OnInit {
  tenderBid = {
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
          'totalPrice': '1800',
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
                'unitPrice': '500',
                'totalPrice': '900',
                'quoteSub': 'sf444'
              },
              {
                'unitPrice': '500',
                'totalPrice': '900',
                'quoteSub': 'sf445'
              },
              {
                'unitPrice': '700',
                'totalPrice': '900',
                'quoteSub': 'sf446'
              },
              {
                'unitPrice': '600',
                'totalPrice': '900',
                'quoteSub': 'sf447'
              },
              {
                'unitPrice': '300',
                'totalPrice': '900',
                'quoteSub': 'sf448'
              },
              {
                'unitPrice': '500',
                'totalPrice': '900',
                'quoteSub': 'sf449'
              },
              {
                'unitPrice': '500',
                'totalPrice': '900',
                'quoteSub': 'sf450'
              },
              {
                'unitPrice': '400',
                'totalPrice': '900',
                'quoteSub': 'sf451'
              },
              {
                'unitPrice': '500',
                'totalPrice': '900',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': '600',
                'totalPrice': '900',
                'quoteSub': 'sf452'
              },
              {
                'unitPrice': '300',
                'totalPrice': '900',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': '300',
                'totalPrice': '900',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': '300',
                'totalPrice': '900',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': '500',
                'totalPrice': '900',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': '400',
                'totalPrice': '900',
                'quoteSub': 'sf452'
              }, {
                'unitPrice': '200',
                'totalPrice': '900',
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
                'unitPrice': '400',
                'totalPrice': '900',
                'quoteSub': 'sf444'
              },
              {
                'unitPrice': '900',
                'totalPrice': '900',
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
          'totalPrice': '1800',
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
                'unitPrice': '400',
                'totalPrice': '900',
                'quoteSub': 'sf444'
              },
              {
                'unitPrice': '600',
                'totalPrice': '900',
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
                'unitPrice': '500',
                'totalPrice': '900',
                'quoteSub': 'sf444'
              },
              {
                'unitPrice': '800',
                'totalPrice': '900',
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

  constructor() { }

  ngOnInit() {
  }
}
