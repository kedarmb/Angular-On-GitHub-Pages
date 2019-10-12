import { Component, OnInit } from '@angular/core';

import {TenderModalComponent} from '../modal/tender-modal/tender-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {

   tender = [
    {
      'id': '1',
      'createdAt': '2019-10-06T07:26:22.540Z',
      'clientName': 'Jerde - Koch',
      'tenderName': 'real-time generating',
      'tenderDescription': 'The CSS capacitor is down, parse the solid state program so we can input the AGP port!',
      'openDate': '2019-07-29T21:34:29.496Z',
      'closeDate': '2019-11-19T23:44:24.171Z',
      'quoteStartDate': '2019-04-08T11:34:08.178Z',
      'quoteEndDate': '2020-09-20T20:54:02.262Z'
    },
    {
      'id': '2',
      'createdAt': '2019-10-06T07:53:40.066Z',
      'clientName': 'Boyer - Wiegand',
      'tenderName': 'Car Intranet',
      'tenderDescription': 'I\'ll navigate the optical THX protocol, that should bus the THX firewall!',
      'openDate': '2019-07-03T22:35:57.897Z',
      'closeDate': '2020-07-06T19:16:01.306Z',
      'quoteStartDate': '2019-06-09T17:47:34.477Z',
      'quoteEndDate': '2020-08-07T14:31:04.465Z'
    },
    {
      'id': '3',
      'createdAt': '2019-10-07T00:29:05.865Z',
      'clientName': 'Goldner LLC',
      'tenderName': 'Avon metrics Handcrafted',
      'tenderDescription': 'Try to back up the RAM bandwidth, maybe it will quantify the multi-byte system!',
      'openDate': '2019-05-07T16:52:08.854Z',
      'closeDate': '2020-05-20T10:39:18.781Z',
      'quoteStartDate': '2019-09-25T16:16:24.349Z',
      'quoteEndDate': '2020-05-25T23:23:43.462Z'
    },
    {
      'id': '4',
      'createdAt': '2019-10-07T05:55:36.144Z',
      'clientName': 'Johnson - Bernier',
      'tenderName': 'Refined Soft Fish',
      'tenderDescription': 'The PCI array is down, reboot the redundant panel so we can input the HDD protocol!',
      'openDate': '2019-02-22T17:29:03.877Z',
      'closeDate': '2020-08-12T15:13:52.329Z',
      'quoteStartDate': '2019-06-07T06:48:47.566Z',
      'quoteEndDate': '2019-11-11T22:00:27.600Z'
    },
    {
      'id': '5',
      'createdAt': '2019-10-06T10:39:34.702Z',
      'clientName': 'Block, Brown and Keeling',
      'tenderName': 'frame',
      'tenderDescription': 'We need to transmit the bluetooth AGP matrix!',
      'openDate': '2018-11-25T19:42:32.520Z',
      'closeDate': '2020-08-19T18:24:04.325Z',
      'quoteStartDate': '2019-01-29T00:35:47.298Z',
      'quoteEndDate': '2020-10-01T12:20:55.437Z'
    },
    {
      'id': '6',
      'createdAt': '2019-10-06T09:57:51.739Z',
      'clientName': 'Rempel, Satterfield and Ferry',
      'tenderName': 'Handcrafted integrated',
      'tenderDescription': 'copying the system won\'t do anything, we need to quantify the cross-platform SMTP microchip!',
      'openDate': '2019-04-10T04:37:00.947Z',
      'closeDate': '2020-02-21T09:10:07.398Z',
      'quoteStartDate': '2019-10-01T09:40:25.401Z',
      'quoteEndDate': '2019-11-25T22:00:15.436Z'
    },
    {
      'id': '7',
      'createdAt': '2019-10-06T18:59:41.378Z',
      'clientName': 'Bayer - Wiza',
      'tenderName': 'interface Response',
      'tenderDescription': 'You can\'t bypass the transmitter without synthesizing the optical RAM firewall!',
      'openDate': '2019-06-14T00:57:55.586Z',
      'closeDate': '2020-02-24T20:48:50.498Z',
      'quoteStartDate': '2019-04-12T07:38:07.835Z',
      'quoteEndDate': '2020-10-05T04:07:19.413Z'
    },
    {
      'id': '8',
      'createdAt': '2019-10-06T21:14:36.085Z',
      'clientName': 'Larkin Group',
      'tenderName': 'override hacking',
      'tenderDescription': 'I\'ll generate the neural XML matrix, that should panel the SMS firewall!',
      'openDate': '2018-11-12T09:28:31.283Z',
      'closeDate': '2020-03-10T06:28:07.782Z',
      'quoteStartDate': '2018-12-18T19:19:20.599Z',
      'quoteEndDate': '2020-08-11T14:55:45.266Z'
    },
    {
      'id': '9',
      'createdAt': '2019-10-06T21:54:09.251Z',
      'clientName': 'Hessel Inc',
      'tenderName': 'Hat',
      'tenderDescription': 'navigating the firewall won\'t do anything, we need to connect the neural XML pixel!',
      'openDate': '2019-08-16T04:48:21.046Z',
      'closeDate': '2020-03-18T12:03:12.803Z',
      'quoteStartDate': '2019-06-09T13:58:29.158Z',
      'quoteEndDate': '2019-12-11T20:24:11.699Z'
    },
    {
      'id': '10',
      'createdAt': '2019-10-06T16:14:48.226Z',
      'clientName': 'Morissette - Kuvalis',
      'tenderName': 'Small Wooden',
      'tenderDescription': 'You can\'t back up the hard drive without compressing the haptic AGP firewall!',
      'openDate': '2019-02-21T13:19:20.296Z',
      'closeDate': '2020-08-17T19:43:16.968Z',
      'quoteStartDate': '2018-12-29T02:30:08.461Z',
      'quoteEndDate': '2020-04-05T01:40:38.990Z'
    },
    {
      'id': '11',
      'createdAt': '2019-10-06T21:04:23.556Z',
      'clientName': 'Ziemann - McCullough',
      'tenderName': 'Thailand Home',
      'tenderDescription': 'transmitting the pixel won\'t do anything, we need to navigate the digital SMS pixel!',
      'openDate': '2019-04-28T04:19:11.601Z',
      'closeDate': '2020-04-30T00:45:35.927Z',
      'quoteStartDate': '2019-01-23T04:18:17.925Z',
      'quoteEndDate': '2019-11-27T09:54:46.710Z'
    },
    {
      'id': '12',
      'createdAt': '2019-10-07T04:36:17.187Z',
      'clientName': 'Marks - Schuppe',
      'tenderName': 'synthesizing',
      'tenderDescription': 'Try to generate the SCSI hard drive, maybe it will navigate the virtual interface!',
      'openDate': '2019-09-04T11:03:44.052Z',
      'closeDate': '2020-05-05T09:33:38.472Z',
      'quoteStartDate': '2018-12-22T18:43:19.431Z',
      'quoteEndDate': '2020-03-06T14:33:48.474Z'
    },
    {
      'id': '13',
      'createdAt': '2019-10-07T05:04:37.532Z',
      'clientName': 'Wyman - Huel',
      'tenderName': 'Money Market Account',
      'tenderDescription': 'I\'ll generate the cross-platform SMTP circuit, that should microchip the AI interface!',
      'openDate': '2019-01-18T20:30:26.152Z',
      'closeDate': '2020-08-11T15:56:51.740Z',
      'quoteStartDate': '2019-09-04T20:27:27.105Z',
      'quoteEndDate': '2020-03-22T01:43:49.169Z'
    },
    {
      'id': '14',
      'createdAt': '2019-10-06T15:27:08.434Z',
      'clientName': 'Walter, O\'Keefe and Bruen',
      'tenderName': 'Hat zero tolerance',
      'tenderDescription': 'I\'ll reboot the bluetooth GB card, that should protocol the TCP program!',
      'openDate': '2019-08-07T07:20:48.638Z',
      'closeDate': '2020-08-24T10:22:10.374Z',
      'quoteStartDate': '2018-10-08T04:35:20.541Z',
      'quoteEndDate': '2020-05-07T11:31:47.524Z'
    },
    {
      'id': '15',
      'createdAt': '2019-10-06T09:40:20.126Z',
      'clientName': 'Abshire, Wiza and Schmitt',
      'tenderName': 'Fresh',
      'tenderDescription': 'I\'ll compress the wireless USB alarm, that should monitor the GB transmitter!',
      'openDate': '2019-06-21T13:05:01.093Z',
      'closeDate': '2020-06-08T15:54:44.545Z',
      'quoteStartDate': '2019-05-29T04:03:22.014Z',
      'quoteEndDate': '2019-12-22T16:37:49.952Z'
    },
    {
      'id': '16',
      'createdAt': '2019-10-06T23:55:24.816Z',
      'clientName': 'Balistreri Group',
      'tenderName': 'sky blue',
      'tenderDescription': 'If we transmit the transmitter, we can get to the USB circuit through the primary SMTP bus!',
      'openDate': '2019-04-30T14:15:07.618Z',
      'closeDate': '2020-05-19T14:37:42.942Z',
      'quoteStartDate': '2018-10-31T15:17:36.949Z',
      'quoteEndDate': '2020-05-11T08:43:27.021Z'
    },
    {
      'id': '17',
      'createdAt': '2019-10-06T14:03:04.985Z',
      'clientName': 'Lueilwitz, Feil and Aufderhar',
      'tenderName': 'Refined Plastic Hat ROI Pizza',
      'tenderDescription': 'I\'ll copy the cross-platform HTTP pixel, that should hard drive the HDD panel!',
      'openDate': '2018-12-14T14:52:08.689Z',
      'closeDate': '2020-01-30T01:30:14.237Z',
      'quoteStartDate': '2019-06-09T12:34:49.333Z',
      'quoteEndDate': '2020-09-19T09:20:50.492Z'
    },
    {
      'id': '18',
      'createdAt': '2019-10-06T20:25:17.360Z',
      'clientName': 'Leffler - Wyman',
      'tenderName': 'Saudi Riyal',
      'tenderDescription': 'You can\'t input the firewall without backing up the wireless XSS card!',
      'openDate': '2019-04-15T18:22:43.382Z',
      'closeDate': '2020-09-27T16:52:05.023Z',
      'quoteStartDate': '2019-01-24T03:27:07.451Z',
      'quoteEndDate': '2020-04-23T09:32:28.983Z'
    },
    {
      'id': '19',
      'createdAt': '2019-10-06T20:18:33.713Z',
      'clientName': 'Kuhic Inc',
      'tenderName': 'compressing Bacon',
      'tenderDescription': 'We need to navigate the haptic SMS interface!',
      'openDate': '2019-02-22T22:40:28.336Z',
      'closeDate': '2020-03-10T16:48:47.774Z',
      'quoteStartDate': '2019-09-08T22:43:48.267Z',
      'quoteEndDate': '2020-09-10T22:14:11.473Z'
    },
    {
      'id': '20',
      'createdAt': '2019-10-06T15:07:48.814Z',
      'clientName': 'Kuvalis - Kertzmann',
      'tenderName': 'Mouse',
      'tenderDescription': 'Use the mobile PCI monitor, then you can synthesize the solid state circuit!',
      'openDate': '2018-10-19T15:02:14.724Z',
      'closeDate': '2020-07-12T01:14:56.024Z',
      'quoteStartDate': '2019-08-06T14:56:16.543Z',
      'quoteEndDate': '2020-08-05T11:05:51.234Z'
    },
    {
      'id': '21',
      'createdAt': '2019-10-06T17:26:34.170Z',
      'clientName': 'Wolff and Sons',
      'tenderName': 'Music backing up Engineer',
      'tenderDescription': 'The SMTP array is down, transmit the auxiliary bandwidth so we can generate the USB system!',
      'openDate': '2019-06-08T19:54:54.059Z',
      'closeDate': '2019-12-25T05:12:23.107Z',
      'quoteStartDate': '2019-02-10T14:30:12.947Z',
      'quoteEndDate': '2019-11-23T01:01:03.615Z'
    },
    {
      'id': '22',
      'createdAt': '2019-10-06T15:32:27.425Z',
      'clientName': 'Moore, Dibbert and Herzog',
      'tenderName': 'Singapore Dollar',
      'tenderDescription': 'You can\'t back up the bus without calculating the open-source SCSI alarm!',
      'openDate': '2019-02-09T04:39:15.318Z',
      'closeDate': '2020-09-04T02:39:05.977Z',
      'quoteStartDate': '2019-06-30T17:47:09.304Z',
      'quoteEndDate': '2020-03-24T10:49:18.912Z'
    },
    {
      'id': '23',
      'createdAt': '2019-10-06T22:28:33.290Z',
      'clientName': 'Hackett, Luettgen and O\'Conner',
      'tenderName': 'capacitor interactive',
      'tenderDescription': 'transmitting the program won\'t do anything, we need to parse the 1080p SQL feed!',
      'openDate': '2018-11-18T17:57:55.687Z',
      'closeDate': '2019-10-13T15:10:58.921Z',
      'quoteStartDate': '2019-02-25T02:45:42.229Z',
      'quoteEndDate': '2019-11-27T15:48:52.911Z'
    },
    {
      'id': '24',
      'createdAt': '2019-10-06T19:24:31.342Z',
      'clientName': 'Lockman, Hagenes and Skiles',
      'tenderName': 'Rustic Soft Shirt connect Bermuda',
      'tenderDescription': 'The SQL port is down, quantify the optical card so we can index the JSON array!',
      'openDate': '2018-11-16T15:50:35.747Z',
      'closeDate': '2020-04-21T03:58:02.113Z',
      'quoteStartDate': '2018-12-15T12:15:50.482Z',
      'quoteEndDate': '2020-05-17T02:15:41.089Z'
    },
    {
      'id': '25',
      'createdAt': '2019-10-06T23:12:56.058Z',
      'clientName': 'Towne - Hintz',
      'tenderName': 'transmit compress',
      'tenderDescription': 'If we back up the firewall, we can get to the PCI feed through the back-end CSS pixel!',
      'openDate': '2019-09-09T18:23:56.480Z',
      'closeDate': '2020-09-17T21:15:36.206Z',
      'quoteStartDate': '2019-01-19T10:30:39.187Z',
      'quoteEndDate': '2020-09-17T18:24:45.056Z'
    },
    {
      'id': '26',
      'createdAt': '2019-10-06T07:43:42.481Z',
      'clientName': 'Kunde - Kunze',
      'tenderName': 'Fantastic Rubber Table bluetooth Handcrafted Wooden Towels',
      'tenderDescription': 'Use the online FTP bandwidth, then you can override the optical port!',
      'openDate': '2018-11-27T14:38:02.303Z',
      'closeDate': '2020-02-14T17:41:25.428Z',
      'quoteStartDate': '2019-08-29T03:54:51.311Z',
      'quoteEndDate': '2020-04-12T10:00:30.793Z'
    },
    {
      'id': '27',
      'createdAt': '2019-10-06T18:52:22.079Z',
      'clientName': 'Kerluke, Wiegand and O\'Conner',
      'tenderName': 'Jordanian Dinar',
      'tenderDescription': 'We need to hack the mobile ADP array!',
      'openDate': '2019-02-17T13:03:06.712Z',
      'closeDate': '2020-06-15T18:18:01.853Z',
      'quoteStartDate': '2019-01-05T00:47:49.544Z',
      'quoteEndDate': '2020-02-29T05:36:35.707Z'
    },
    {
      'id': '28',
      'createdAt': '2019-10-06T16:02:41.158Z',
      'clientName': 'Prosacco, Jacobson and Kuhn',
      'tenderName': 'Convertible Marks Auto Loan Account',
      'tenderDescription': 'quantifying the matrix won\'t do anything, we need to compress the back-end TCP pixel!',
      'openDate': '2019-09-05T01:09:14.903Z',
      'closeDate': '2019-10-28T01:56:41.249Z',
      'quoteStartDate': '2019-01-04T06:20:38.820Z',
      'quoteEndDate': '2020-05-20T21:48:22.219Z'
    },
    {
      'id': '29',
      'createdAt': '2019-10-07T04:15:16.288Z',
      'clientName': 'Bergnaum, Gaylord and Deckow',
      'tenderName': 'Trail Fresh',
      'tenderDescription': 'You can\'t bypass the program without connecting the back-end SMTP protocol!',
      'openDate': '2019-04-17T21:28:07.600Z',
      'closeDate': '2020-09-04T23:36:23.152Z',
      'quoteStartDate': '2019-09-23T09:48:25.988Z',
      'quoteEndDate': '2019-10-25T00:56:12.182Z'
    }]


  ngOnInit() {
  }

  onDelete(index) {
     this.tender.splice(index, 1);
  }
  constructor(private modalService: NgbModal) {}

  open() {
    this.modalService.open(TenderModalComponent,{centered:true});

  }

}
