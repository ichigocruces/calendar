import { Client } from "./client";
import { EventColor, EventAction } from "calendar-utils";


export interface Appointment{
    id: number,
    start_date: Date,
    end_date?: Date,
    client: Client,
    allDay: boolean,
    editable:boolean,

    draggable?: boolean,
    resizable?: {
        beforeStart: boolean, // this allows you to configure the sides the event is resizable from
        afterEnd: boolean
      }
    color?: EventColor,
    actions?: EventAction,
    
}