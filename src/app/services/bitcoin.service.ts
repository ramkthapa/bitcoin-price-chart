import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class BitcoinService {

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get('https://openexchangerates.org/api/currencies.json').pipe(
        catchError((err: ErrorHandler)=>{
          console.error('Currencies does not fetch');
          return throwError(err);
        })
      );
  }

  getLatestRates(code: any) {
    return this.http.get(`${environment.coinDeskUrl}/currentprice/${code}.json`).pipe(
      catchError((err: ErrorHandler)=>{
        console.error('Latest rates does not fetch');
        return throwError(err);
      })
    );
  }

  getHistoricRates(currency: any, startDate: any, endDate: any) {
    return this.http.get(`${environment.coinDeskUrl}/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`).pipe(
      catchError((err: ErrorHandler)=>{
        console.error('Historic Rates does not fetch');
        return throwError(err);
      })
    );
  }
}
