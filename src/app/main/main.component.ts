import { Component, OnInit } from '@angular/core';
import { MoneyService } from '../money.service';

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
  }

}
