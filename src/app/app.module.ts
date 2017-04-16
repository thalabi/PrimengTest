import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { InputTextModule, DataTableModule, ButtonModule, SharedModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { _404Component } from './404.component';

import { InputTextComponent } from './input-text/input-text.component';
import { DatatableBasicComponent } from './datatable-basic/datatable-basic.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    _404Component,
    InputTextComponent,
    DatatableBasicComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
    BrowserAnimationsModule,
    InputTextModule, DataTableModule, SharedModule, ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
