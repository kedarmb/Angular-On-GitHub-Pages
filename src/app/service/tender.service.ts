import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  constructor(private httpService: HttpClient) { }

  getTenders() {
    return this.httpService.get(`https://5d98bdd161c84c00147d7173.mockapi.io/tenders`);
  }
}
