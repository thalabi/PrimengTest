import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';

@Component({
  selector: 'app-picklist',
  templateUrl: './picklist.component.html',
  styleUrls: ['./picklist.component.css']
})
export class PicklistComponent implements OnInit {

  schoolYearsSource: SchoolYear[];
  schoolYearsTarget: SchoolYear[];
  
  constructor() { }

  ngOnInit() {
    this.schoolYearsSource = [
      {id: 1, schoolYear: '2015-2016', startDate: new Date(), endDate: new Date(), version: 0, studentSet: []},
      {id: 2, schoolYear: '2016-2017', startDate: new Date(), endDate: new Date(), version: 0, studentSet: []},
      {id: 3, schoolYear: '2017-2018', startDate: new Date(), endDate: new Date(), version: 0, studentSet: []}
    ];
    this.schoolYearsTarget = [
      {id: 1, schoolYear: '3015-3016', startDate: new Date(), endDate: new Date(), version: 0, studentSet: []},
      {id: 2, schoolYear: '3016-3017', startDate: new Date(), endDate: new Date(), version: 0, studentSet: []},
      {id: 3, schoolYear: '3017-3018', startDate: new Date(), endDate: new Date(), version: 0, studentSet: []}
    ];
  }

}
