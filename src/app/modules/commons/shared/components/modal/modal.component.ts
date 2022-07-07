import { Component, OnInit } from '@angular/core';
import { IModalShared } from '../../../interfaces/modal-shared.interface';

@Component({
  selector: 'pay-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modal: IModalShared

  constructor() { }

  ngOnInit() {}

}
