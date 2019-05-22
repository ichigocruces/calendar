import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Appointment } from "../appointment";
import { AppointmentService } from "../appointment.service";

import { CalendarEvent, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from '../custom-date-formatter.provider';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {

  refresh: Subject<any> = new Subject();

  view: string='week';
  viewDate = new Date();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  excludeDays: number[] = [0, 6];
  dayStartHour: number = 7;
  dayEndHour: number = 21;

  //sidenav
  sidenav_opened: boolean = false;
  currentEmployee: number = 1;

  events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;

  constructor(@Inject(LOCALE_ID) protected locale: string, private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents(): void{
    this.events$ = this.appointmentService.fetchEvents(this.view, this.viewDate, this.currentEmployee);

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }

}
