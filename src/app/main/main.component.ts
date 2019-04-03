import { Component, OnInit } from '@angular/core';
import { MoneyService } from '../money.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private moneyService: MoneyService) { }
  
  dollar: number;
  euro: number;
  objectApi: any;
  interval: any;

  convertDollarToEuro() {
    this.moneyService.convertDollarToEuro().subscribe(res => {
      this.objectApi = res;
      this.euro=this.objectApi.rates.CAD*this.dollar;
    });
  }
  async convertDollarToEuroAsync() {
    this.objectApi=await this.moneyService.convertDollarToEuroAsync();
    this.euro=this.objectApi.rates.CAD*this.dollar;
  }

  ngOnInit() {
    this.dollar = 0;
    this.euro = 0;
    //Call each 10 minutes service to refresh values
    this.interval = setInterval(() => {
        this.convertDollarToEuro();
    }, (environment.timerRequest * 60)*1000);
  }

}
