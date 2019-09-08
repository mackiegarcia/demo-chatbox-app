import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { UtilityService, StatusCode } from '../../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public userNamePlaceHolder = 'User name';
  public passwordPlaceHolder = 'password';
  public userNameInputId = 'username-valid';
  public passwordInputId = 'password-valid';

  constructor(private accountSvc: AccountService, private utilSvc: UtilityService) { }

  ngOnInit() {
    this.utilSvc.destroySession();
  }

  cleanUserNameField(): void {
    this.userNamePlaceHolder = 'User name';
    this.userNameInputId = 'username-valid';
  }

  cleanPasswordField(): void {
    this.passwordPlaceHolder = 'password';
    this.passwordInputId = 'username-valid';
  }

  login(): void {
    let errorFlag = false;

    if ( !this.username || this.username.length === 0) {
      this.userNamePlaceHolder = 'Please enter a valid value.';
      this.userNameInputId = 'username-invalid';
      errorFlag = true;
    }

    if ( !this.password || this.password.length === 0) {
      this.passwordPlaceHolder = 'Please enter a valid value.';
      this.passwordInputId = 'password-invalid';
      errorFlag = true;
    }

    if (!errorFlag) {
      this.accountSvc.loginUser(this.username, this.password).subscribe(result => {
        if (result.status === StatusCode.OK) {
          this.utilSvc.createSession(result.data.id, result.data.username);
        } else if (result.status === StatusCode.UNAUTHORIZED) {
          // username has no record and so create record
          window.alert(`Username ${this.username} does not exist. Creating account with the given username and password.`);
          // tslint:disable-next-line: no-shadowed-variable
          this.accountSvc.addUser(this.username, this.password).subscribe(result => {
            this.utilSvc.createSession(result.data.id,  result.data.username);
          });
        } else {
          window.alert('Password incorrect!');
        }
      });
    }
  }
}
