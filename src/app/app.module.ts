import { PaymentsComponent } from './modules/pages/payments/payments.component';
import { AuthService } from './modules/commons/services/auth.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/commons/shared/shared.module';
import { LoginComponent } from './modules/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentsService } from './modules/pages/payments/services/payments.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    MessageService,
    PaymentsService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
