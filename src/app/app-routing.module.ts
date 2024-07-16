import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './src/app/modules/subscription/subscription.component';
import { CancellationComponent } from './src/app/modules/cancellation/cancellation.component';
import { TransactionHistoryComponent } from './src/app/modules/transaction-history/transaction-history.component';

const routes: Routes = [
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'cancellation', component: CancellationComponent },
  { path: 'transaction-history', component: TransactionHistoryComponent },
  { path: '', redirectTo: '/subscription', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }