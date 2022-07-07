import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    constructor(private _http: HttpClient) {}

    tryLogin(credentials): Observable<any> {

      return this._http.post(environment.endpoints.login, credentials).pipe(first());
    }

    getUser(): Observable<any> {

      return this._http.get(environment.endpoints.profile).pipe(first());
    }
}
