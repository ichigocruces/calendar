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
  MatPaginatorModule
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
  MatPaginatorModule
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
