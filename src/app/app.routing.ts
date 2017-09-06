import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { InputTextComponent } from './input-text/input-text.component';
import { DatatableBasicComponent } from './datatable-basic/datatable-basic.component';
import { DatatableScrollableComponent } from './datatable-scrollable/datatable-scrollable.component';
import { ButtonComponent } from './button/button.component';
import { DialogComponent } from './dialog/dialog.component';
import { DatatableCrudComponent } from './datatable-crud/datatable-crud.component';
import { PicklistComponent } from './picklist/picklist.component';
import { _404Component } from './404.component';

const routes: Routes = [
    {path: '',  component: InputTextComponent},
    {path: 'inputText',  component: InputTextComponent},
    {path: 'datatableBasic', component: DatatableBasicComponent},
    {path: 'datatableScrollable', component: DatatableScrollableComponent},
    {path: 'button', component: ButtonComponent},
    {path: 'dialog', component: DialogComponent},
    {path: 'datatableCrud', component: DatatableCrudComponent},
    {path: 'picklist', component: PicklistComponent},
    {path: '**',            component: _404Component}
]

export const AppRouting = RouterModule.forRoot(routes);