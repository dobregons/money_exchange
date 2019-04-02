import { Component, OnInit } from "@angular/core";
import { MoneyService } from "./money.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private moneyService: MoneyService) {}
  title = "MoneyExchange";

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
