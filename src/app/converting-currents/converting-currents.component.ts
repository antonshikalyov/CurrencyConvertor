import { Component } from '@angular/core';
import { HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-converting-currents',
  templateUrl: './converting-currents.component.html',
  styleUrls: ['./converting-currents.component.css']
})


export class ConvertingCurrentsComponent {
  public uah: string [] = [];

  USDtoUAH: any = 0;
  EURtoUAH: any = 0;
  GBPtoUAH: any = 0;
  USDtoEUR: any = 0;
  USDtoGBP: any = 0;  // Api don't provide information for it
  EURtoGBP: any = 0;  // Api don't provide information for it

  constructor(private http: HttpClient) {

  }

  selectedValueFirst: any;
  selectedValueSecond: any;
  firstInput: any = 0;
  secondInput: any = 0;

  currencies: Currency[] = [
    {value: 'UAH', viewValue: 'UAH'},
    {value: 'USD', viewValue: 'USD'},
    {value: 'EUR', viewValue: 'EUR'},
    {value: 'GBP', viewValue: 'GBP'},
  ];

  convertCurrencyFirst(i: number) {
    var preResult: string = "";
    var logic: number = 0;
    preResult = this.selectedValueFirst + this.selectedValueSecond;
    console.log(i)
    if (i == 1) {
      logic = 1;
    } else {
      logic = 2;
    }
    console.log(preResult);

    
    switch (preResult) {
      case ("UAHUSD"):
        console.log((this.firstInput / this.USDtoUAH).toFixed(2) )
        logic == 1 ? this.secondInput = (this.firstInput / this.USDtoUAH).toFixed(2) 
                 : this.firstInput = (this.secondInput * this.USDtoUAH).toFixed(2);
      break;
      case ("UAHEUR"):
        logic == 1 ? this.secondInput = (this.firstInput / this.EURtoUAH).toFixed(2) 
                 : this.firstInput = (this.secondInput * this.EURtoUAH).toFixed(2);
      break;

      case ("EURUSD"):
        logic == 1 ? this.secondInput = (this.firstInput * this.USDtoEUR).toFixed(2) 
                   : this.firstInput = (this.secondInput / this.USDtoEUR).toFixed(2);
      break;
      case ("EURUAH"):
        logic == 1 ? this.secondInput = (this.firstInput * this.EURtoUAH).toFixed(2) 
        : this.firstInput = (this.secondInput / this.EURtoUAH).toFixed(2);
      break;

      case ("USDEUR"):
        logic == 1 ? this.secondInput = (this.firstInput / this.USDtoEUR).toFixed(2) 
                   : this.firstInput = (this.secondInput * this.USDtoEUR).toFixed(2);
      break;
      case ("USDUAH"):
        logic == 1 ? this.secondInput = (this.firstInput * this.USDtoUAH).toFixed(2) 
                 : this.firstInput = (this.secondInput / this.USDtoUAH).toFixed(2);
      break;

      case ("GBPUAH"):
        logic == 1 ? this.secondInput = (this.firstInput * this.GBPtoUAH).toFixed(2) 
                 : this.firstInput = (this.secondInput / this.GBPtoUAH).toFixed(2);
      break;
      case ("UAHGBP"):
        logic == 1 ? this.secondInput = (this.firstInput / this.GBPtoUAH).toFixed(2) 
                 : this.firstInput = (this.secondInput * this.GBPtoUAH).toFixed(2);
      break;
      
      case ("GBPEUR"):
        var GBPtoUAH = this.firstInput * this.GBPtoUAH;
        var EURtoUAH = this.secondInput * this.EURtoUAH;
        logic == 1 ? this.secondInput = (GBPtoUAH / this.EURtoUAH).toFixed(2) 
                   : this.firstInput = (EURtoUAH / this.GBPtoUAH).toFixed(2);
      break;
      case ("EURGBP"):
        var GBPtoUAH = this.secondInput * this.GBPtoUAH;
        var EURtoUAH = this.firstInput * this.EURtoUAH;
        logic == 1 ? this.secondInput = (EURtoUAH / this.GBPtoUAH).toFixed(2) 
        : this.firstInput = (GBPtoUAH / this.EURtoUAH).toFixed(2);
      break;
      case ("USDGBP"):
        var USDtoUAH = this.firstInput * this.USDtoUAH;
        var GBPtoUAH = this.secondInput * this.GBPtoUAH;
        logic == 1 ? this.secondInput = (USDtoUAH / this.GBPtoUAH).toFixed(2) 
        : this.firstInput = (GBPtoUAH / this.USDtoUAH).toFixed(2);
      break;
      case ("GBPUSD"):
        var USDtoUAH = this.secondInput * this.USDtoUAH;
        var GBPtoUAH = this.firstInput * this.GBPtoUAH;
        console.log(GBPtoUAH);
        logic == 1 ? this.secondInput = (GBPtoUAH / this.USDtoUAH).toFixed(2) 
        : this.firstInput = (USDtoUAH / this.GBPtoUAH).toFixed(2);
      break;

      case ("USDUSD"):
        logic==1 ? this.secondInput = this.firstInput : this.firstInput = this.secondInput;
      break;
      case ("EUREUR"):
        logic==1 ? this.secondInput = this.firstInput : this.firstInput = this.secondInput;
      break;
      case ("UAHUAH"):
        logic==1 ? this.secondInput = this.firstInput : this.firstInput = this.secondInput;
      break;
      case ("GBPGBP"):
        logic==1 ? this.secondInput = this.firstInput : this.firstInput = this.secondInput;
      break;
      default:
        break;
    }
  }


  ngOnInit() {
    this.http.get("https://api.monobank.ua/bank/currency")
    .subscribe((data: any) => {
      this.uah = data;
      this.USDtoUAH = data[0].rateSell;
      this.EURtoUAH = data[1].rateSell;
      this.USDtoEUR = data[2].rateSell;
      this.GBPtoUAH = data[3].rateCross;
    });
  }
}

interface Currency {
  value: string;
  viewValue: string;
}