import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../commons/services/auth.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  user = null;
  constructor(
    public route: ActivatedRoute,
    private _router: Router,
    private $authService: AuthService
    ) { }

  ngOnInit() {
    if(!this.route.snapshot.queryParams.hasOwnProperty('id')){
      this._router.navigate(['../']);
    }

    this.$authService.getUser().subscribe(user => {
      this.user = user;
    })

  }

}
