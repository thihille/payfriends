import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { MessageService } from 'primeng/api';
import { AuthService } from '../../commons/services/auth.service';
import { PaymentsService } from './services/payments.service';

import { IPaymentAccount } from './interfaces/payment.interface';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  user = null;
  payments: IPaymentAccount[] = [];
  clonedPayments: IPaymentAccount[] = [];
  paymentSelected = null;
  loadingPayments: boolean = true;
  modalDeletePayment: boolean = false;
  modalInsertPayment: boolean = false;
  hasUpdateUser: boolean = false;
  formPayment: FormGroup;

  dateTime = new Date();

  filterTable = {
    name: true,
    category: true,
    debit_date: true,
    amount: true,
    paid: true,
    typePaid: null,
  };

  waitingResponse: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private _router: Router,
    private authService$: AuthService,
    private paymentsService$: PaymentsService,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService
  ) {}

  ngOnInit() {

    if (!this.route.snapshot.queryParams.hasOwnProperty('id')) {
      this._router.navigate(['../']);
    }

    this.authService$.getUser().subscribe((user) => {
      this.user = user;
    });

    this.formPayment = this._formBuilder.group({
      name: [null, Validators.required],
      amount: [null, Validators.required],
      debit_date: [null, [Validators.required]],
      category: [null],
      paid: [null],
    });

    this._getPayments();
  }

  getDateType(debitDate, formatDate = null, output = null) {

    return moment(debitDate, formatDate).format(output);
  }

  getLabelPaids() {

    if (typeof this.filterTable.typePaid === 'object') {
      return 'Todas as contas';
    }

    return this.filterTable.typePaid ? 'Contas pagas' : 'Contas em aberto';
  }

  handleInsertPayment() {

    this.hasUpdateUser = false;
    this.formPayment.reset();
    this.modalInsertPayment = true;
  }

  handleUpdatePayment(payment: IPaymentAccount) {

    this.paymentSelected = payment;
    this.formPayment.controls['name'].patchValue(payment.name);
    this.formPayment.controls['debit_date'].patchValue(
      this.getDateType(
        payment.debit_date,
        'YYYY-MM-DD HH:mm',
        'DD/MM/YYYY HH:mm'
      )
    );
    this.formPayment.controls['amount'].patchValue(payment.amount);
    this.formPayment.controls['category'].patchValue(payment.category);
    this.formPayment.controls['paid'].patchValue(payment.paid);
    this.modalInsertPayment = true;
  }

  insertPayment() {

    if (this.formPayment.invalid) {
      return;
    }

    this.waitingResponse = true;

    const debitDate = this.formPayment.controls['debit_date'].value;
    const data: IPaymentAccount = {
      ...this.formPayment.value,
      debit_date: this.getDateType(
        this.getDateType(debitDate, null, 'YYYY-MM-DD HH:mm')
      ),
      user: this.formPayment.controls['name'].value
        .toLowerCase()
        .replace(/[^A-Z0-9]/gi, '_'),
      paid: false,
    };

    this._insertPayment(data);
  }

  updatePayment() {

    if (this.formPayment.invalid) {
      return;
    }

    this.waitingResponse = true;

    const debitDate = this.formPayment.controls['debit_date'].value;
    const data: IPaymentAccount = {
      id: this.paymentSelected.id,
      ...this.formPayment.value,
      debit_date: this.getDateType(
        this.getDateType(debitDate, 'DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm')
      ),
      user: this.formPayment.controls['name'].value
        .toLowerCase()
        .replace(/[^A-Z0-9]/gi, '_'),
    };

    this._updatePayment(data);
  }

  onChangePaid(paid: boolean, payment: IPaymentAccount) {

    this._updatePaymentPaid(paid, payment);
  }

  onFilterByPaid(paid) {

    this.payments = this.clonedPayments;
    if (paid.value === null) return;

    this.payments = this.payments.filter((p) => p.paid === paid.value);
  }

  handleConfirmDeletePayment(payment: IPaymentAccount) {

    this.paymentSelected = payment;
    this.modalDeletePayment = true;
  }

  deletePayment(paymentId: number) {

    this.waitingResponse = true;
    this._deletePayment(paymentId);
  }

  reloadPayments() {

    this.modalInsertPayment = false;
    this.modalDeletePayment = false;
    this.paymentSelected = null;

    this._getPayments();
  }

  private _showNotification(message: string, typeMessage: string) {

    this._messageService.add({
      key: 'toastr',
      severity: typeMessage,
      summary: typeMessage === 'success' ? 'Sucesso!' : 'Erro!',
      detail: message,
    });
  }

  private _getPayments() {

    this.paymentsService$.getPayments().subscribe((data: IPaymentAccount[]) => {
      this.payments = data.map((p) => {
        return {
          ...p,
          disabled: false,
        };
      });
      this.clonedPayments = this.payments;
      this.loadingPayments = false;
      this.waitingResponse = false;
    }, error => {


    });
  }

  private _deletePayment(paymentId: number) {

    this.payments = this.payments.filter((p) => p.id !== paymentId);
    this.paymentsService$.paymentDelete(paymentId).subscribe(
      () => {
        this.reloadPayments();
        this._showNotification('Conta apagada com sucesso!', 'success');
      },
      () => {
        this.modalDeletePayment = false;
        this.waitingResponse = false;
        this._showNotification('Erro ao apagar a conta!', 'error');
      }
    );
  }

  private _insertPayment(payment: IPaymentAccount) {

    this.paymentsService$.insertPayment(payment).subscribe(
      () => {
        this.reloadPayments();
        this._showNotification('Conta cadastrada com sucesso!', 'success');
      },
      () => {
        this.waitingResponse = false;
        this._showNotification('Erro ao inserir uma conta!', 'error');
      }
    );
  }

  private _updatePayment(payment: IPaymentAccount) {

    this.paymentsService$.updatePayment(payment).subscribe(
      () => {
        this.reloadPayments();
        this._showNotification('Conta atualizada com sucesso!', 'success');
      },
      () => {
        this.waitingResponse = false;
        this._showNotification('Erro ao atualizar conta!', 'error');
      }
    );
  }

  private _updatePaymentPaid(paid: boolean, payment: IPaymentAccount) {

    this.payments = this.payments.map((p) => {
      return {
        ...p,
        disabled: true,
      };
    });

    this.paymentsService$.updatePaymentPaid(payment.id, paid).subscribe(
      () => {
        this.reloadPayments();
        this._messageService.clear('toastr');
        this._showNotification(
          `Pagamento de ${payment.name} atualizado com sucesso!`,
          'success'
        );
      },
      () => {
        this.waitingResponse = false;
        this._showNotification('Não foi possível registrar o pagamento!','error');
      }
    );
  }
}
