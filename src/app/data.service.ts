import { Injectable } from '@angular/core';
import { Student } from './domain/Student';
import { Note } from './domain/Note';
import { SchoolYear } from './domain/SchoolYear';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Constants } from './constants';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/concat';
// Observale operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) { }

  getAllSchoolYears(): Observable<SchoolYear[]> {
    return this.http.get(Constants.STUDENT_NOTES_SERVICE_URL+"/schoolYear/getAllSchoolYears"/*,
                          {headers: this.httpHeaders()}*/)
          .map(response => {
            return response.json() as SchoolYear[];
          })
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
