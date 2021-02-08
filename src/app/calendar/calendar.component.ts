import { Component, Inject, LOCALE_ID, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { finalize, takeUntil, map, take } from 'rxjs/operators';

import { CalendarEvent, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
import { CustomDateFormatter } from '../custom-date-formatter.provider';
import { DayViewHourSegment } from 'calendar-utils';
import { addDays, addMinutes, endOfWeek } from 'date-fns';

import { Appointment } from "../appointment";
import { AppointmentService } from "../appointment.service";

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {

  refresh: Subject<any> = new Subject();

  view: string='week';
  viewDate = new Date();
  //weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  excludeDays: number[] = [0, 6];
  dayStartHour: number = 7;
  dayEndHour: number = 21;
  dragToCreateActive = false;

  //sidenav
  sidenav_opened: boolean = false;
  currentEmployee: number = 1;

  events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;

  constructor(@Inject(LOCALE_ID) protected locale: string, private appointmentService: AppointmentService, private cdr: ChangeDetectorRef) { }

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

  editEvent(event: CalendarEvent ): void {
    console.log('Edit event', event.id, event.title);
  }

  deleteEvent(event: CalendarEvent ): void {
    console.log('delete event', event.id, event.title);
    this.appointmentService.delete(event.id);
  }

  startDragToCreate(
    segment: DayViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {

    const dragToSelectEvent: CalendarEvent = {
      title: 'New event',
      start: segment.date,
      meta: {
        tmpEvent: true
      }
    };

    this.addTmpEvent(dragToSelectEvent);
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate);

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refreshCalendar();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);

        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
          this.refreshCalendar();
        }
      });
  }

  // FIXME EL PROBLEMA ES QUE NO SE ANYADE EL EVENTO AL LISTADO
  private addTmpEvent(calendarEvent: CalendarEvent) {
    this.events$.pipe(take(1)).subscribe(eventList => {
      console.log(eventList.length);

      eventList.push(calendarEvent);

      console.log(eventList.length);
    })
  }

  private refreshCalendar(){
    this.cdr.detectChanges();
  }

}
