import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TProgressComponent } from './progress.component';



@NgModule({
  declarations: [TProgressComponent],
  exports: [TProgressComponent],
  imports: [
    CommonModule
  ]
})
export class TProgressModule { }
