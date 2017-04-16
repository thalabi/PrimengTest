import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InputTextComponent } from './input-text/input-text.component';
import { DatatableBasicComponent } from './datatable-basic/datatable-basic.component';
import { _404Component } from './404.component';

const routes: Routes = [
    {path: '',  component: InputTextComponent},
    {path: 'inputText',  component: InputTextComponent},
    {path: 'datatableBasic', component: DatatableBasicComponent}
    ,
    {path: '**',            component: _404Component}
]

export const AppRouting = RouterModule.forRoot(routes);