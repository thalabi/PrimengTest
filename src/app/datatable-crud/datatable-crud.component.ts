import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';
import { DataService } from './../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datatable-crud',
  templateUrl: './datatable-crud.component.html',
  styleUrls: ['./datatable-crud.component.css']
})
export class DatatableCrudComponent implements OnInit {

  displayDialog: boolean;
  selectedSchoolYear: SchoolYear;
  newCar: boolean;
  schoolYears: SchoolYear[];

  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getAllSchoolYears().subscribe({
      next: schoolYears => {
        this.schoolYears = schoolYears;
        for (let i=0; i<this.schoolYears.length; i++) {
          this.schoolYears[i].startDateFormatted = this.datePipe.transform(this.schoolYears[i].startDate, 'MMM dd, yyyy');
          this.schoolYears[i].endDateFormatted = this.datePipe.transform(this.schoolYears[i].endDate, 'MMM dd, yyyy');
        }
        console.log('schoolYears[]: ', this.schoolYears);
      },
      error: error => {
        console.error(error);
        // TODO uncomment later
        //this.messageService.clear();
        //this.messageService.error(error);
      }});
    
  }

  onRowSelect(event) {
    this.selectedSchoolYear.endDate = new Date();
    
  }
  showDialogToAdd() {
  }
}
