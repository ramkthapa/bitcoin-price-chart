import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class BitcoinService {
  constructor(private http: HttpClient) { }
  getCurrencies() {
    return this.http.get('https://openexchangerates.org/api/currencies.json')
  }

  getLatestRates(code: any) {
    return this.http.get(`${environment.coinDeskUrl}/currentprice/${code}.json`)
  }

  getHistoricRates(currency: any, startDate: any, endDate: any) {
    return this.http.get(`${environment.coinDeskUrl}/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`)
  }
}
