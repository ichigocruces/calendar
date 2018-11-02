import { Component, OnInit, Input } from '@angular/core';
import { Client } from "../client";
import { ClientService } from '../client.service';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  @Input() client: Client;

  constructor(private route: ActivatedRoute,
    private clientService: ClientService) { }

  ngOnInit() {
    this.get();
  }

  get(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.clientService.get(id).subscribe(client => this.client = client)

  }
}
