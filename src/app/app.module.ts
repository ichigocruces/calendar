//angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//HTTP
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


//material modules
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//APP common components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { MessagesComponent } from './messages/messages.component';

//business components
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    MessagesComponent,
    ClientDetailComponent,
    ClientsComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    MaterialModule, 
    BrowserAnimationsModule, 
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
