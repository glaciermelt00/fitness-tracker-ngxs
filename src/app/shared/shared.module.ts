import { NgModule }         from "@angular/core";
import { CommonModule }     from "@angular/common";
import { FormsModule }      from "@angular/forms";
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule }  from '../material.module';

const MODULES = [
  CommonModule,
  FormsModule,
  MaterialModule,
  FlexLayoutModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class SharedModule {}
