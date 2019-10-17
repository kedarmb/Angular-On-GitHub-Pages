import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tender-item',
  templateUrl: './create-tender-item.component.html',
  styleUrls: ['./create-tender-item.component.scss']
})
export class CreateTenderItemComponent implements OnInit {

  items = [{
    name: 'Cement',
    unitPrice: 50,
    quantity: 30,
    totalPrice: 100
  }];
  constructor() { }

  ngOnInit() {
  }

  hello() {
    alert('hey add');
   // this.items.push({name: '', unitPrice: 0, quantity: 0, totalPrice: 0})
  }


}
