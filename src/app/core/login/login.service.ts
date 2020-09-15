import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AccountService } from '../auth/account.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { Login } from './login.model';



@Injectable({ providedIn: 'root' })
export class LoginService {

    constructor(private authServerProvider: AuthServerProvider,
        private accountService: AccountService
    ) { }

    login(credentials: Login): Observable<any> {
        return this.authServerProvider.login(credentials)
            .pipe(
                flatMap(() => this.accountService.identity(true))
            );
    }

    logout(): void {
        this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
    }
}
