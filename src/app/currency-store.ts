import { observable, action } from 'mobx-angular';

class CurrenciesStore {
    @observable currencies = [];
    @action setCurrencies(currencies:any) {
        this.currencies = currencies;
    }
}
export const currenciesStore = new CurrenciesStore();
