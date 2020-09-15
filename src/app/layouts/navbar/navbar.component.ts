import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/auth/account.service';
import { LoginService } from 'src/app/core/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router,
              private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    console.log('hdh');
    this.loginService.logout();
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

}
