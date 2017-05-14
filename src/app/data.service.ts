import { Injectable } from '@angular/core';
import { Student } from './domain/Student';
import { Note } from './domain/Note';
import { SchoolYear } from './domain/SchoolYear';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Constants } from './constants';
import { ConfigService } from './config/config.service';
import { ApplicationProperties } from './config/application.properties';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/concat';
// Observale operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  serviceUrl: string;

  constructor(
    private http: Http,
    private configService: ConfigService
  ) {
    const applicationProperties: ApplicationProperties = this.configService.getApplicationProperties();
    this.serviceUrl = applicationProperties.serviceUrl;
    console.log(this.serviceUrl);
  }

  private httpHeaders(): Headers {
    return new Headers({
      //'Authorization': 'Bearer ' + this.sessionDataService.user.token,
      'Content-Type': 'application/json'});
  }

  getAllSchoolYears(): Observable<SchoolYear[]> {
    return this.http.get(this.serviceUrl+"/schoolYear/getAllSchoolYears",
                          {headers: this.httpHeaders()})
          .map(response => {
            return response.json() as SchoolYear[];
          })
          .catch(this.handleError);
  }

  saveSchoolYear(schoolYear: SchoolYear): Observable<SchoolYear> {

    console.log('in saveSchoolYear, schoolYear: ', schoolYear);
    delete schoolYear.startDateFormatted;
    delete schoolYear.endDateFormatted;
    console.log('after pruning saveSchoolYear, schoolYear: ', schoolYear);
    return this.http
      .post(this.serviceUrl+"/schoolYear/saveSchoolYear", JSON.stringify(schoolYear),
              {headers: this.httpHeaders()})
      .map(response => {
        return response.json() as SchoolYear;
      })
      .catch(this.handleError);
  }

  deleteSchoolYear(schoolYear: SchoolYear) {

    return this.http
      .delete(this.serviceUrl+"/schoolYear/deleteSchoolYearById/"+schoolYear.id, {headers: this.httpHeaders()})
      .catch(this.handleError);
  }

  private handleError (response: Response | any) {
      console.log(response);
      let errorMessage: string;
      if (response instanceof Response) {
        let serverErrorMessage: string;
        try {
          const bodyJson = response.json();
          serverErrorMessage = bodyJson.errorMessage || JSON.stringify(bodyJson);
        } catch (error) {
          serverErrorMessage = response.text();
        } 
        console.error(serverErrorMessage);
         errorMessage = `HTTP: ${response.status} - ${response.statusText || ''}. Server error message: ${serverErrorMessage}`;
      } else {
          errorMessage = response.message ? response.message : response.toString();
      }
      return Observable.throw(errorMessage);
  }

}
