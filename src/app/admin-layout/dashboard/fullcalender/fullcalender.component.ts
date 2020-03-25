import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { HelperService } from 'app/shared/core/service/helper.service';
import { TenderService } from '../../../shared/core/service/tender.service';
import { Tender } from '../../../shared/core/model/tender.model';
import { HttpService } from '../../../shared/core/service/http.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-fullcalender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./fullcalender.component.scss'],
  templateUrl: './fullcalender.component.html'
})
export class FullcalenderComponent implements OnInit {
  tenders: any = [{}];
  data: any = [{}];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  // events: CalendarEvent[{}] = settenderobj;
  events: CalendarEvent[] = [
    {
      start: new Date('2019-12-29T18:30:00.000Z'),
      end: new Date('2019-12-29T18:30:00.000Z'),
      title: 'Quote end date for tender - An excellent Tender',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: new Date('2019-12-30T18:30:00.000Z'),
      end: new Date('2019-12-30T18:30:00.000Z'),
      title: 'Tender end date for tender - An excellent Tender',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },

    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  // mess = {};

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  activeDayIsOpen = true;

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  public tender_events: any = {
    start: Date,
    end: Date,
    title: String,
    TenderName: String,
    color: colors.red,
    allDay: true,
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  };

  constructor(
    private modal: NgbModal,
    private hs: HelperService,
    private tenderService: TenderService,
    private httpServ: HttpService
  ) {
    this.events = <any>this.hs.setTenderEven();
    // console.log('mmmmmmmm', this.events);
  }
  ngOnInit() {
    this.getAllTenders();
    const settenderobj: any = this.hs.setTenderEven();
    // console.log('jjjjjjjjjjjjjj', settenderobj);
  }
  getAllTenders() {
    /* this.httpServ.getTenders().subscribe((result) => {
    this.tenders = result.body as Array<any>;

    }, (err) => {
      console.log('err in fetching tender headers ', err);
    }) */
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: '',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
