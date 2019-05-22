import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule, 
  MatSidenavModule
} from '@angular/material';

const material_modules = [
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule, MatSidenavModule
];


@NgModule({
  imports: [
    material_modules
  ],
  declarations: [],
  exports: [
    material_modules
  ]
})
export class MaterialModule { }
