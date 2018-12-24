import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { Observable } from 'rxjs';
import { Appointment } from "../appointment";
import { AppointmentService } from "../appointment.service";


import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: string='week';
  viewDate = new Date();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  //excludeDays: number[] = [0, 6];

  events$: Observable<Array<CalendarEvent<{ appointment: Appointment }>>>;

  constructor(@Inject(LOCALE_ID) protected locale: string, private appointmentService: AppointmentService, private http: HttpClient) { }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents(): void{
    this.events$ = this.appointmentService.fetchEvents(this.view, this.viewDate);

  }

  


}
