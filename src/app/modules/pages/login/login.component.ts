import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../commons/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: FormGroup;
  loading: boolean = false;
  viewPassword: boolean = false;
  messageError: string = null;

  subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private _router: Router,
    private $authService: AuthService
  ) {}

  ngOnInit() {
    this.credentials = this._formBuilder.group({
      login: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      pass: [null, Validators.required],
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  handleLogin() {

    if (this.credentials.invalid) {
      return;
    }

    const dataLogin = this.credentials.value;
    this.messageError = null;
    this.loading = true;

    this._tryLogin(dataLogin);
  }

  private _tryLogin(credentials) {

    this.subscriptions.push(
      this.$authService.tryLogin(credentials).subscribe(
        () => {
          this._router.navigate(['payments'], {
            relativeTo: this.route,
            queryParams: {
              id: 1,
            },
          });
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.messageError =
            'Não foi possível acessar a PayFriends! Verifique a conexão!';
        }
      )
    );
  }
}
