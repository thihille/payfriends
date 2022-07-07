import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IHeaderShared } from '../../../interfaces/header-shared.interface';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'pay-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  image: IHeaderShared = null;
  loading: boolean = true;

  @Input('user') userProfile = null;

  constructor() { }

  ngOnInit() {

  }

}
