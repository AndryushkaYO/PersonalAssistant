import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BalanceWheel } from './balance-wheel';

@Injectable({
  providedIn: 'root'
})
export class BalanceWheelService {
  url = 'http://localhost:3000/api/balance/';

  constructor(private http: HttpClient) { }

  getBalances() {
    return this.http.get<{ message: string; balances: any }>(this.url)
    .pipe(
      map((data) => { 
        return {
          balances: data.balances.map((el) => ({
            id: el['_id'],
            ...el,
          })),
        };
      })
    );
  }

  addBalance(balance: BalanceWheel) {
    return this.http
      .post<{ message: string, habbit: BalanceWheel }>(this.url, balance);
  }

  updateBalance(balance: BalanceWheel) {
    return this.http.put(this.url + balance.id, balance);
  }
}
