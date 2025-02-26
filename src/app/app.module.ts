import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriptionComponent } from './src/app/modules/subscription/subscription.component';
import { CancellationComponent } from './src/app/modules/cancellation/cancellation.component';
import { TransactionHistoryComponent } from './src/app/modules/transaction-history/transaction-history.component';
import { FundService } from './src/app/services/fund.service';
import { BalanceService } from './src/app/services/BalanceService';

import Swal from 'sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    SubscriptionComponent,
    CancellationComponent,
    TransactionHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FundService, BalanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
