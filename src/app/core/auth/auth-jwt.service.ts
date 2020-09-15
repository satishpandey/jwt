import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Login } from '../login/login.model';
import { SERVER_API_URL } from 'src/app/app.constants';

type JwtToken = {
    id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
    constructor(private http: HttpClient,
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService
    ) { }

    //   getToken(): string {
    //     return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
    //   }

    login(credentials: Login): Observable<void> {
        console.log(credentials);
        return this.http
            .post<JwtToken>(SERVER_API_URL + 'api/authenticate', credentials)
            .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
    }

      logout(): Observable<void> {
        return new Observable(observer => {
        //   this.$localStorage.clear('authenticationToken');
          localStorage.clear();
        //   this.$sessionStorage.clear('authenticationToken');
          sessionStorage.clear();
          observer.complete();
        });
      }

    private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
        const jwt = response.id_token;
        if (rememberMe) {
            // this.$localStorage.store('authenticationToken', jwt);
            localStorage.setItem('authenticationToken', jwt);
        } else {
            // this.$sessionStorage.store('authenticationToken', jwt);
            sessionStorage.setItem('authenticationToken', jwt);
        }
    }
}
