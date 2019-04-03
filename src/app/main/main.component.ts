import { Component, OnInit } from '@angular/core';
import { MoneyService } from '../money.service';
import { environment } from '../../environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
//import { CustomValidator } from './shared/validation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private moneyService: MoneyService, private fb: FormBuilder) { }
  
  dollar: number;
  euro: number;
  objectApi: any;
  interval: any;
  formName: FormGroup;

  convertDollarToEuro() {
    this.moneyService.convertDollarToEuro().subscribe(res => {
      this.objectApi = res;
      this.euro=this.formatNumber(this.objectApi.rates.CAD*this.dollar);
    });
  }
  async convertDollarToEuroAsync() {
    this.objectApi=await this.moneyService.convertDollarToEuroAsync();
    this.euro=this.formatNumber(this.objectApi.rates.CAD*this.dollar);
  }

  ngOnInit() {
    this.dollar = 0;
    this.euro = 0;
    //Call each 1 minutes service to refresh values
    this.interval = setInterval(() => {
        this.convertDollarToEuro();
    }, (environment.timerRequest * 60)*1000);
    //Form validator
    this.formName = this.fb.group({
      numberInput: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,4})?$/)]],
      numberInputEuro: ['']
     });
  }

  // validateNumber(e: any) {
  //     let input = String.fromCharCode(e.charCode);
  //     const reg = /^\d+(\,\d{0,4})? *?$/;
    
  //     if (!reg.test(input)) {
  //       e.preventDefault();
  //     }
  // }

  formatNumber(number) {
      return number.toString().replace(/(\.\d+)|\B(?=(\d{3})+(?!\d))/g, function(m,g1){
          return g1 || ","
      });
  };

}
