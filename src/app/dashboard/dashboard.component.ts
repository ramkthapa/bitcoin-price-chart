import { currenciesStore } from './../currency-store';
import { BitcoinService } from '../services/bitcoin.service';
import { Component,OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { NgForm } from '@angular/forms';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  store:any = currenciesStore;
  form: any = <any>{
    currency: 'USD',
    startDate: '',
    endDate: ''
  }
  currencies: any[] = [];

  options = {
    responsive: true,
    maintainAspectRatio: false
  };


  lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: '' },
  ];

  lineChartLabels: any = [];


  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'pink',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: any = 'line';

  constructor(private bitcoinService: BitcoinService) {}


  ngOnInit() {
    if (Object.keys(this.store.currencies).length == 0) {
      this.getCurrencies();
    }
    else {
      this.currencies = Object.keys(this.store.currencies).map(key => ({
        name: this.store.currencies[key],
        value: key
      }))
    }
  }

  // Get available currencies
  getCurrencies() {
    this.bitcoinService.getCurrencies()
      .subscribe(res => {
        this.store.setCurrencies(res);
        this.currencies = Object.keys(this.store.currencies).map(key => ({
          name: this.store.currencies[key],
          value: key
        }))
      }, err => {
}, () => {
})
  }


  // To get old rates
  getHistoricRates(historicRateForm: NgForm) {
    if (historicRateForm.invalid) {
      return;
    }
    const { currency, startDate, endDate } = this.form;
    this.bitcoinService.getHistoricRates(currency, startDate, endDate)
      .subscribe((res: any) => {

        const timeDuration = Object.keys(res.bpi);
        const amount = Object.keys(res.bpi).map(key => res.bpi[key]);

        this.lineChartLabels = timeDuration;

        this.lineChartData = [
          {
            label: `bitcoin Value in Dollar`,
            data: amount,
          }
        ]
      })
  }


}
