import { Client } from "./client";
import { Employee } from "./employee";
import { EventColor, EventAction } from "calendar-utils";


export interface Appointment{
    codCita: number,
    fhIni: Date,
    fhFin?: Date,
    cliente?: Client,
    empleado: Employee,
    estado: AppointmentStatus,

    allDay: boolean,
    editable:boolean,

    draggable?: boolean,
    resizable?: {
        beforeStart: boolean, // this allows you to configure the sides the event is resizable from
        afterEnd: boolean
      }
    
    actions?: EventAction,
    
    
}

interface AppointmentStatus{
    codEstado: number,
    descripcion: string
}