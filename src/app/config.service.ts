import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// Observale operators
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ConfigService {

  public restUrl: string;
  constructor(private http: Http) { }

  getRestUrl(): Promise<string> {
    console.log('get user called');
    let configFileUrl: string = 'config.json';
    let promise = this.http.get(configFileUrl).map(res => res.json()).toPromise();
    promise.then(restUrl => this.restUrl = restUrl);
    return promise;
  }
}

// export function getConfigService() {
//   return new ConfigService();
// }