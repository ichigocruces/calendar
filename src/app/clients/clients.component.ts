import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from "../client.service";
import { MessageService } from "../message.service";
import { Client } from "../client";
import { MessageType } from "../message";
import {MatPaginator, MatTableDataSource} from '@angular/material';

const CLIENT_COLUMNS: string[] = ['id', 'nombre', 'apellido1', 'apellido2', 'telefono', 'actions'];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  
  dataSource = new MatTableDataSource<Client>();
  displayedColumns = CLIENT_COLUMNS;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public clientService: ClientService,
    public messageService: MessageService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  getAll(): void{
    this.clientService.getAll().subscribe(clients=> this.dataSource.data = clients);
  }

  delete(client: Client){
    this.dataSource.data = this.dataSource.data.filter(c => c!== client);
    this.clientService.delete(client);

    this.messageService.add("Deleted client correctly", MessageType.INFO);
  }

}
