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
  selectedSchoolYear: SchoolYear;
  schoolYears: SchoolYear[];

  schoolYearForm : FormGroup;
  crudMode: string;

  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadSchoolYears();

    this.schoolYearForm = this.formBuilder.group({
      'id': [''],
      'schoolYear': ['', Validators.required],
      'startDate': ['', dateValidator],
      'endDate': ['', dateValidator],
      'version': ['']
    }, {validator: startAndEndDateValidator})
    
  }

  loadSchoolYears() {
    this.dataService.getAllSchoolYears().subscribe({
      next: schoolYears => {
        this.schoolYears = schoolYears;
        for (let i=0; i<this.schoolYears.length; i++) {
          this.schoolYears[i].startDateFormatted = this.datePipe.transform(this.schoolYears[i].startDate, 'MMM dd, yyyy');
          this.schoolYears[i].endDateFormatted = this.datePipe.transform(this.schoolYears[i].endDate, 'MMM dd, yyyy');
        }
      },
      error: error => {
        console.error(error);
        // TODO uncomment later
        //this.messageService.clear();
        //this.messageService.error(error);
      }});
  }

  onRowSelect(event) {
    this.displayDialog = true;
  }

  showDialog(crudMode: string) {
    this.crudMode = crudMode;
    console.log('crudMode', crudMode);
    console.log('this.crudMode', this.crudMode);
    if (crudMode == 'Add') {
      this.schoolYearForm = this.populateDialog(this.schoolYearForm, new SchoolYear());
    } else {
      this.schoolYearForm = this.populateDialog(this.schoolYearForm, this.selectedSchoolYear);
    }
    this.displayDialog = true;
  }

  onSubmit() {
    let schoolYear: SchoolYear = this.populateSchoolYear(this.schoolYearForm);
    console.log('schoolYear', schoolYear);
    if (this.crudMode != 'Delete') {
      this.dataService.saveSchoolYear(schoolYear)
      .subscribe({
          error: error => {
            console.error(error);
            // this.messageService.clear();
            // this.messageService.error(error);
          },
          complete: () => {
            this.loadSchoolYears();
          }
      });
    } else {
      this.dataService.deleteSchoolYear(schoolYear)
      .subscribe({
          error: error => {
            console.error(error);
            // this.messageService.clear();
            // this.messageService.error(error);
          },
          complete: () => {
            this.loadSchoolYears();
          }
      });
    }
      this.displayDialog = false;
  }

  onCancel() {
    this.displayDialog = false;
  }

  startDateOnBlur() {
    console.log('startDateOnBlur()');
  }
  populateDialog(schoolYearForm: FormGroup, schoolYear: SchoolYear): FormGroup {
    schoolYearForm.reset();
    schoolYearForm.controls['id'].setValue(schoolYear.id);
    schoolYearForm.controls['schoolYear'].setValue(schoolYear.schoolYear);
    schoolYearForm.controls['startDate'].setValue(schoolYear.startDateFormatted);
    schoolYearForm.controls['endDate'].setValue(schoolYear.endDateFormatted);
    schoolYearForm.controls['version'].setValue(schoolYear.version);
    return schoolYearForm;
  }

  populateSchoolYear(schoolYearForm: FormGroup): SchoolYear {
    let schoolYear = new SchoolYear();
    schoolYear.id = schoolYearForm.get('id').value;
    schoolYear.schoolYear = schoolYearForm.get('schoolYear').value;
    schoolYear.startDate = new Date(schoolYearForm.get('startDate').value);
    schoolYear.endDate = new Date(schoolYearForm.get('endDate').value);
    schoolYear.version = schoolYearForm.get('version').value;
    return schoolYear;
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
  
  return matches && dateValid ? null : {dateValidatorMessage: "Date is invalid"};
}

function startAndEndDateValidator(formGroup: FormGroup): {[key: string]: any} {
  let startDate: Date = new Date(formGroup.controls['startDate'].value);
  let endDate: Date = new Date(formGroup.controls['endDate'].value);
  return startDate > endDate ? {startAndEndDateValidatorMessage: "start date is greater than end date"} : null;
}