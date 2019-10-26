import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchSubscriberService {

  private subject: Subject<string> = new Subject<string>();
  constructor() { }

  public set(text) {
    this.subject.next(text);
  }

  public get() {
    return this.subject;
  }
}
