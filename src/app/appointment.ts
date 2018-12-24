import { Client } from "./client";

export interface Appointment{
    id: number,
    start_date: Date,
    end_date: Date,
    client: Client,
    allDay: boolean
    
}