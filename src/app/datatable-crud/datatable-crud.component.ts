import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';

@Component({
  selector: 'app-datatable-crud',
  templateUrl: './datatable-crud.component.html',
  styleUrls: ['./datatable-crud.component.css']
})
export class DatatableCrudComponent implements OnInit {

  displayDialog: boolean;
  schoolYear: SchoolYear = new SchoolYear();
  selectedCar: SchoolYear;
  newCar: boolean;
  schoolYears: SchoolYear[];
  constructor() { }

  ngOnInit() {
  }

}
