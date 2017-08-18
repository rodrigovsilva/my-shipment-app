import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdSelectModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdSnackBarModule
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk';

const modules = [
  CdkTableModule,
  CommonModule,
  FormsModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdSelectModule,
  MdProgressSpinnerModule,
  MdProgressBarModule,
  MdSelectModule,
  MdSnackBarModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
];

@NgModule({
  imports: [ modules ],
  exports: [ modules ],
  declarations: [],
})
export class MaterialModule { }