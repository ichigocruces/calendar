import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endOfDay, endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Appointment } from "./appointment";
import { CalendarEvent } from 'angular-calendar';


const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  constructor(private http: HttpClient) { }
  private appointmentURL = 'api/appointments';

  fetchEvents(view: string, viewDate: Date): Observable<Array<CalendarEvent<{ appointment: Appointment }>>> {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[view];

    const params = new HttpParams()
      .set(
        'starDate',
        format(getStart(viewDate), 'YYYY/MM/DD')
      )
      .set(
        'endDate',
        format(getEnd(viewDate), 'YYYY/MM/DD')
      );
        var results: Appointment[];


    // this.http.get(this.appointmentURL ).pipe(
    //   tap(data => 
    //     console.log('get data: ' + data)));

        this.http.get(this.appointmentURL)
  .subscribe(data => console.log(data));

    

    return this.http
      .get(this.appointmentURL)
      .pipe(
        map(({ results }: { results: Appointment[] }) => {
          console.log('results: ' + results);
          return results.map((appointment: Appointment) => {
            return {
              title: appointment.client.nombre,
              start: appointment.start_date,
              end: appointment.end_date,
              allDay: appointment.allDay,
              meta: {
                appointment
              }
            };
          });
        })
      );
  }


}
