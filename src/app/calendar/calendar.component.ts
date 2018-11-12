import { Component, OnInit } from '@angular/core';
import { CalendarEvent , DAYS_OF_WEEK} from 'angular-calendar';

import { LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  viewDate = new Date();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  excludeDays: number[] = [0, 6];
  
  
  events: CalendarEvent[] = [ ];

  constructor(@Inject(LOCALE_ID) protected locale: string) { }

  ngOnInit() {
    console.log(this.locale);
  }

}
