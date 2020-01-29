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
    'sections': [
      {
        'name': 'Section 1',
        'sectionTotal': '80$',

        'lineItems': [
          {
            'specNo': '561000Sno',
            'itemNo': '981000Ino',
            'name': 'line 3',
            'description': 'String',
            'unit': 'm',
            'quantity': '150',
            'unitCost': '500',
            'totalCost': '1010',

          },
          {
            'specNo': '561001Sno',
            'itemNo': '981001Ino',
            'name': 'line 4',
            'description': 'String',
            'unit': 'String',
            'quantity': '300',
            'unitCost': '500',
            'totalCost': '1010',
          }
        ]
      },
      {
        'name': 'Section 2',
        'sectionTotal': '50$',

        'lineItems': [
          {
            'specNo': '561002Sno',
            'itemNo': '981002Ino',
            'name': 'line 1',
            'description': 'String',
            'unit': 'm',
            'quantity': '800',
            'unitCost': '500',
            'totalCost': '1010'
            ,
          },
          {
            'specNo': '561003Sno',
            'itemNo': '981003Ino',
            'name': 'line 2',
            'description': 'String',
            'unit': 'm',
            'quantity': '500',
            'unitCost': '500',
            'totalCost': '1010'
          }
        ],
      },
      {
        'name': 'Section 2',
        'sectionTotal': '50$',

        'lineItems': [
          {
            'specNo': '561002Sno',
            'itemNo': '981002Ino',
            'name': 'line 1',
            'description': 'String',
            'unit': 'm',
            'quantity': '800',
            'unitCost': '500',
            'totalCost': '1010'
            ,
          },
          {
            'specNo': '561003Sno',
            'itemNo': '981003Ino',
            'name': 'line 2',
            'description': 'String',
            'unit': 'm',
            'quantity': '500',
            'unitCost': '500',
            'totalCost': '1010'
          }
        ],
      },
      {
        'name': 'Section 2',
        'sectionTotal': '50$',

        'lineItems': [
          {
            'specNo': '561002Sno',
            'itemNo': '981002Ino',
            'name': 'line 1',
            'description': 'String',
            'unit': 'm',
            'quantity': '800',
            'unitCost': '500',
            'totalCost': '1010'
            ,
          },
          {
            'specNo': '561003Sno',
            'itemNo': '981003Ino',
            'name': 'line 2',
            'description': 'String',
            'unit': 'm',
            'quantity': '500',
            'unitCost': '500',
            'totalCost': '1010'
          }
        ],
      },
      {
        'name': 'Section 2',
        'sectionTotal': '50$',

        'lineItems': [
          {
            'specNo': '561002Sno',
            'itemNo': '981002Ino',
            'name': 'line 1',
            'description': 'String',
            'unit': 'm',
            'quantity': '800',
            'unitCost': '500',
            'totalCost': '1010'
            ,
          },
          {
            'specNo': '561003Sno',
            'itemNo': '981003Ino',
            'name': 'line 2',
            'description': 'String',
            'unit': 'm',
            'quantity': '500',
            'unitCost': '500',
            'totalCost': '1010'
          }
        ],
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }
}
