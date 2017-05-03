import { Component, OnInit } from '@angular/core';
//import { DataTableModule, SharedModule } from 'primeng/primeng';
import { SchoolYear } from '../domain/SchoolYear';

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
      {id: 1, schoolYear: '2015-2016', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 2, schoolYear: '2016-2017', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []},
      {id: 3, schoolYear: '2017-2018', startDate: new Date(), endDate: new Date(), version: 0, startDateFormatted: '', endDateFormatted: '', studentSet: []}
    ];
    console.log(this.schoolYears);
  }

}
