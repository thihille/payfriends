import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/pages/login/login.component';
import { PaymentsComponent } from './modules/pages/payments/payments.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'payments', component: PaymentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
