import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Client } from "./client";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const clients: Client[] = [
      {id: 1, nombre: 'Juan',apellido1:'Gonzalez', apellido2:'Martin', telefono:911222333, email:null, dni:null },
      {id: 2, nombre: 'Martin',apellido1:'Loppez', apellido2:'Ruiz', telefono:444555666, email:null, dni:null },
      {id: 3, nombre: 'Gaizka',apellido1:'Gomez', apellido2:'Martinez', telefono:777888999, email:null, dni:null },
      {id: 4, nombre: 'Jose',apellido1:'Ruiz', apellido2:'Gomez', telefono:999888000, email:null, dni:null },
      {id: 5, nombre: 'Jon',apellido1:'Angulo', apellido2:'Gonzalez', telefono:999666555, email:null, dni:null },
      {id: 6, nombre: 'Ivan',apellido1:'Sanchez', apellido2:'Lopez', telefono:333444555, email:null, dni:null },
      {id: 7, nombre: 'Igor',apellido1:'Bermejo', apellido2:'Skywalker', telefono:222333444, email:null, dni:null },
      {id: 8, nombre: 'Sara',apellido1:'Martinez', apellido2:'Smith', telefono:666777888, email:null, dni:null },
      {id: 9, nombre: 'Olaia',apellido1:'Martinez', apellido2:'Olaf', telefono:888777666, email:null, dni:null },
      {id: 10, nombre: 'Julian',apellido1:'Han', apellido2:'Saura', telefono:999000444, email:null, dni:null },
      {id: 11, nombre: 'Ohiana',apellido1:'Solo', apellido2:'Lopez', telefono:999333444, email:null, dni:null },
    ];
    return {clients};
  }

  // Overrides the genId method to ensure that a client always has an id.
  // If the clients array is empty,
  // the method below returns the initial number (11).
  // if the clients array is not empty, the method below returns the highest
  // hero id + 1.
  genId(clients: Client[]): number {
    return clients.length > 0 ? Math.max(...clients.map(hero => hero.id)) + 1 : 11;
  }
}
