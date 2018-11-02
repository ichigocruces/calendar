import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientDetailComponent }      from './client-detail/client-detail.component';
import { ClientsComponent }      from './clients/clients.component';
import { CalendarComponent }      from './calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/detail/:id', component: ClientDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
