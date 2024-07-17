// balance.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private userBalance: number = 500000; // Saldo inicial

  constructor() { }

  getBalance(): number {
    return this.userBalance;
  }

  setBalance(newBalance: number): void {
    this.userBalance = newBalance;
  }

  addToBalance(amount: number): void {
    this.userBalance += amount;
  }

  subtractFromBalance(amount: number): void {
    this.userBalance -= amount;
  }
}