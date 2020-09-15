import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/core/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false],
  });

  constructor(private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  login(): void {

    const creds = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value,
      rememberMe: this.loginForm.get('rememberMe')!.value,
    }

    this.loginService.login(creds).subscribe(
      () => {
        console.log('done');
      });
  }

}
