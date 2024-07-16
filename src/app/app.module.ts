import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriptionComponent } from './src/app/modules/subscription/subscription.component';
import { CancellationComponent } from './src/app/modules/cancellation/cancellation.component';
import { TransactionHistoryComponent } from './src/app/modules/transaction-history/transaction-history.component';
import { NotificationComponent } from './src/app/modules/notification/notification.component';
import { FundService } from './src/app/services/fund.service';


@NgModule({
  declarations: [
    AppComponent,
    SubscriptionComponent,
    CancellationComponent,
    TransactionHistoryComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FundService],
  bootstrap: [AppComponent]
})
export class AppModule { }
