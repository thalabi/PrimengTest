import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, SharedModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { _404Component } from './404.component';

import { InputTextComponent } from './input-text/input-text.component';
import { DatatableBasicComponent } from './datatable-basic/datatable-basic.component';
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { DatatableCrudComponent } from './datatable-crud/datatable-crud.component';

import { DataService } from './data.service';
import { ConfigService } from './config.service';
import { Http } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    _404Component,
    InputTextComponent,
    DatatableBasicComponent,
    ButtonComponent,
    DialogComponent,
    DatatableCrudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    AppRouting,
    BrowserAnimationsModule,
    InputTextModule, DataTableModule, ButtonModule, DialogModule, SharedModule
  ],
  providers: [
    DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.getRestUrl(),
      deps: [DataService, Http],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
