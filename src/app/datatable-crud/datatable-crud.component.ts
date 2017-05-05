import { Component, OnInit } from '@angular/core';
import { SchoolYear } from '../domain/SchoolYear';
import { DataService } from './../data.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '../constants';

@Component({
  selector: 'app-datatable-crud',
  templateUrl: './datatable-crud.component.html',
  styleUrls: ['./datatable-crud.component.css']
})
export class DatatableCrudComponent implements OnInit {

  displayDialog: boolean;
  schoolYear: SchoolYear = new SchoolYear();
  selectedSchoolYear: SchoolYear;
  newSchoolYear: boolean;
  schoolYears: SchoolYear[];

  schoolYearForm : FormGroup;
  crudMode: string;

  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
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

    this.schoolYearForm = this.formBuilder.group({
      'schoolYear' : [{value: this.schoolYear.schoolYear, disabled: this.crudMode == 'Delete'}],
      'startDate' : [{value: this.datePipe.transform(this.schoolYear.startDate, 'MMM dd, yyyy'), disabled: this.crudMode == 'Delete'},
                      dateValidator],
      'endDate' : [{value: this.datePipe.transform(this.schoolYear.endDate, 'MMM dd, yyyy'), disabled: this.crudMode == 'Delete'},
                      dateValidator]
    })
    
  }

  onRowSelect(event) {
    this.newSchoolYear = false;
    console.log(this.schoolYear)
    //this.schoolYear = this.cloneSchoolYear(event.data);
    this.populateDialog(this.schoolYearForm, event.data);
    console.log(event.data)
    console.log(this.schoolYear)
    this.displayDialog = true;
  }

  showDialogToAdd() {
    this.newSchoolYear = true;
    this.schoolYear = new SchoolYear();
    this.displayDialog = true;
  }

  onSubmit() {
    let schoolYears = [...this.schoolYears];
    // console.log(this.newSchoolYear);
    if(this.newSchoolYear) {
      let schoolYear: SchoolYear = new SchoolYear();
      console.log(this.schoolYearForm.get('schoolYear').value);
      schoolYear.schoolYear = this.schoolYearForm.get('schoolYear').value;
      schoolYears.push(schoolYear);
    } else {
      schoolYears[this.findSelectedSchoolYearIndex()] = this.schoolYear;
    }
    this.schoolYears = schoolYears;
    this.schoolYear = null;
    this.displayDialog = false;
  }

  findSelectedSchoolYearIndex(): number {
    return this.schoolYears.indexOf(this.selectedSchoolYear);
  }

  cloneSchoolYear(c: SchoolYear): SchoolYear {
    let schoolYear = new SchoolYear();
    for(let prop in c) {
      schoolYear[prop] = c[prop];
    }
    return schoolYear;
  }

  populateDialog(schoolYearForm: FormGroup, schoolYear: SchoolYear) {
    schoolYearForm.controls['schoolYear'].setValue(schoolYear.schoolYear);
    schoolYearForm.controls['startDate'].setValue(schoolYear.startDateFormatted);
    schoolYearForm.controls['endDate'].setValue(schoolYear.endDateFormatted);
  }
  
}


function timestampValidator(control: FormControl): {[key: string]: any} {
  const timestamp = control.value || '';
  const patternValid = Constants.TIMESTAMP_PATTERN.test(timestamp);
  // console.log('dateValidator(), patternValid: ', patternValid);
  const matches = timestamp.match(Constants.TIMESTAMP_PATTERN);
  // console.log('dateValidator(), matches: ', matches);
  let timestampValid = true;
  if (matches) {
    let [year, monthIndex, day, hour, minute] = [matches[3], Constants.MONTHS.indexOf(matches[1].toLowerCase()), matches[2], matches[4], matches[5]];
    //let [year, monthIndex, day, hour, minute] = [matches[3], Constants.MONTHS.indexOf(matches[1].toLowerCase()), matches[2], +matches[4] + (matches[6].toLowerCase() == 'pm' ? 12 : 0), matches[5]];
    console.log('dateValidator(), time components: ', year, monthIndex, day, hour, minute);
    if (monthIndex == -1 || day > 31 || hour > 12 || minute > 60) {
      timestampValid = false;
    } else {
      hour = +hour + (matches[6].toLowerCase() == 'pm' ? 12 : 0);
      if ([1,3,5,7,8,10,12].indexOf(monthIndex+1) == -1 && day == 31) {
        timestampValid = false;
      } else if (monthIndex+1 == 2) {
          if (((year % 4 == 0 && year % 100) || year % 400 == 0) && day == 29) {
              timestampValid = true;
          } else if (day > 28) {
              timestampValid = false;
          }
      }
    }
    console.log('dateValidator(), timestampValid: ', timestampValid);
  }
  
  return matches && timestampValid ? null : {invalidDate: true};
}

function dateValidator(control: FormControl): {[key: string]: any} {
  const inputDate = control.value || '';
  const patternValid = Constants.DATE_PATTERN.test(inputDate);
  const matches = inputDate.match(Constants.DATE_PATTERN);
  let dateValid = true;
  if (matches) {
    let [year, monthIndex, day] = [matches[3], Constants.MONTHS.indexOf(matches[1].toLowerCase()), matches[2]];
    console.log('dateValidator(), time components: ', year, monthIndex, day);
    if (monthIndex == -1 || day > 31) {
      dateValid = false;
    } else {
      if ([1,3,5,7,8,10,12].indexOf(monthIndex+1) == -1 && day == 31) {
        dateValid = false;
      } else if (monthIndex+1 == 2) {
          if (((year % 4 == 0 && year % 100) || year % 400 == 0) && day == 29) {
              dateValid = true;
          } else if (day > 28) {
              dateValid = false;
          }
      }
    }
    console.log('dateValidator(), timestampValid: ', dateValid);
  }
  
  return matches && dateValid ? null : {invalidDate: true};
}
