import { Component, OnInit } from '@angular/core';
//import { DataTableModule, SharedModule } from 'primeng/primeng';
import { SchoolYear } from '../dto/SchoolYear';

@Component({
  selector: 'app-datatable-basic',
  templateUrl: './datatable-basic.component.html',
  styleUrls: ['./datatable-basic.component.css']
})
export class DatatableBasicComponent implements OnInit {

  schoolYears: SchoolYear[];

  constructor() { }

  ngOnInit() {
    this.schoolYears = [
      {id: 1, schoolYear: '2015-2016', version: 0},
      {id: 2, schoolYear: '2016-2017', version: 0},
      {id: 3, schoolYear: '2017-2018', version: 0}
    ];
    console.log(this.schoolYears);
  }

}
