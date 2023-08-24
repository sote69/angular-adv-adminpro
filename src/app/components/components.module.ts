import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GDonaComponent } from './g-dona/g-dona.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    GDonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementadorComponent,
    GDonaComponent,
    NgChartsModule
  ]
})
export class ComponentsModule { }
