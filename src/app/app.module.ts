import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TDatagridModule } from './modules/datagrid/datagrid.module';
import { TProgressModule } from './modules/progress/progress.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TDatagridModule,
    TProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
