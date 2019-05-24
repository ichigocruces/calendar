import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endOfDay, endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from "./appointment";
import { CalendarEvent } from 'angular-calendar';
import { environment } from '../environments/environment';


const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  constructor(private http: HttpClient) { }
  private appointmentURL = environment.URL_API + '/appointments';
  

  fetchEvents(view: string, viewDate: Date, employeeID: number): Observable<Array<CalendarEvent<{ appointment: Appointment }>>> {
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
      ).set(
        'employeeId',
        '' + employeeID
      );

    return this.http
      .get(this.appointmentURL, {headers, params})
      // FIXME: descomentar cuando este el servicio
      // .get(this.appointmentURL, {headers, params})
      .pipe(
        map((results: Appointment[]) => {
          return results.map((appointment: Appointment) => {
            return {
              id: appointment.codCita,
              title: appointment.cliente.nombre,
              start: new Date(appointment.fhIni),
              end: new Date(appointment.fhFin),
              allDay: appointment.allDay,
              //color: getColor(appointment.empleado),

              draggable: appointment.editable,
              resizable: {
                beforeStart: appointment.editable,
                afterEnd: appointment.editable
              },
              actions: [
                {
                  label: '<i class="fa fa-fw fa-pencil"></i>',
                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    console.log('Edit event', event);
                  }
                },
                {
                  label: '<i class="fa fa-fw fa-times"></i>',
                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    console.log('Event deleted', event);
                  }
                }
              ],

              meta: {
                appointment
              }
            };
          });
        })
      );

  }


}
