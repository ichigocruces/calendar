import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Client } from "./client";
import { Appointment } from "./appointment";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    var client1: Client = {id: 1, nombre: 'Juan',apellido1:'Gonzalez', apellido2:'Martin', telefono:911222333, email:null, dni:null };
    var client2: Client = {id: 2, nombre: 'Martin',apellido1:'Loppez', apellido2:'Ruiz', telefono:444555666, email:null, dni:null };
    var client3: Client = {id: 3, nombre: 'Gaizka',apellido1:'Gomez', apellido2:'Martinez', telefono:777888999, email:null, dni:null };
    var client4: Client = {id: 4, nombre: 'Jon',apellido1:'Angulo', apellido2:'Gonzalez', telefono:999666555, email:null, dni:null };
    var client5: Client = {id: 5, nombre: 'Ivan',apellido1:'Sanchez', apellido2:'Lopez', telefono:333444555, email:null, dni:null };
    var client6: Client = {id: 6, nombre: 'Igor',apellido1:'Bermejo', apellido2:'Skywalker', telefono:222333444, email:null, dni:null };
    var client7: Client = {id: 7, nombre: 'Sara',apellido1:'Martinez', apellido2:'Smith', telefono:666777888, email:null, dni:null };
    var client8: Client = {id: 8, nombre: 'Olaia',apellido1:'Martinez', apellido2:'Olaf', telefono:888777666, email:null, dni:null };
    var client9: Client = {id: 9, nombre: 'Julian',apellido1:'Lopez', apellido2:'Martin', telefono:911222333, email:null, dni:null };
    var client10: Client = {id: 10, nombre: 'Julian',apellido1:'Han', apellido2:'Saura', telefono:999000444, email:null, dni:null };
    var client11: Client = {id: 11, nombre: 'Ohiana',apellido1:'Solo', apellido2:'Lopez', telefono:999333444, email:null, dni:null };

    const clients: Client[] = [
      client1, client2, client3, client4, client5, client6, client7, client8, client9, client10, 
      client11,
      
    ];

    const appointments: Appointment[] = [
      {id: 1, start_date: new Date(2018, 10, 19, 12, 30, 0, 0), end_date: new Date(2018, 10, 19, 14, 30, 0, 0), client: client1, allDay: false},
      {id: 2, start_date: new Date(2018, 10, 19, 15, 30, 0, 0), end_date: new Date(2018, 10, 19, 16, 30, 0, 0), client: client2, allDay: false},
    ];

    return {clients , appointments};
  }

  // Overrides the genId method to ensure that a client always has an id.
  // If the clients array is empty,
  // the method below returns the initial number (11).
  // if the clients array is not empty, the method below returns the highest
  // hero id + 1.
  genId<T extends Client | Appointment>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(row => row.id)) + 1 : 11;
  }
}
