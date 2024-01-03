import { Component } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-converting-currents',
  templateUrl: './converting-currents.component.html',
  styleUrls: ['./converting-currents.component.css']
})


export class ConvertingCurrentsComponent {
  public USDtoUAH: number = 0;
  public EURtoUAH: number = 0;
  public GBPtoUAH: number = 0;
  public USDtoEUR: number = 0;
  public USDtoGBP: number = 0;  // Api don't provide information for it
  public EURtoGBP: number = 0;  // Api don't provide information for it

  constructor(private http: HttpClient) {

  }

  selectedValueFirst: string = '';
  selectedValueSecond: string = '';
  firstInput: number = 0;
  secondInput: number = 0;

  currencies: Currency[] = [
    {value: 'UAH'},
    {value: 'USD'},
    {value: 'EUR'},
    {value: 'GBP'},
  ];

  parsFunction(num: number) {
    return parseFloat((num).toFixed(2));
  }

  convertCurrencyFirst(logic: number) {
    switch (this.selectedValueFirst + this.selectedValueSecond) {
      case ("UAHUSD"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput / this.USDtoUAH)
                    : this.firstInput =  this.parsFunction(this.secondInput * this.USDtoUAH);
      break;
      case ("UAHEUR"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput / this.EURtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput * this.EURtoUAH);
      break;

      case ("EURUSD"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput * this.USDtoEUR)
                    : this.firstInput = this.parsFunction(this.secondInput / this.USDtoEUR);
      break;
      case ("EURUAH"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput * this.EURtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput / this.EURtoUAH);
      break;

      case ("USDEUR"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput / this.USDtoEUR)
                    : this.firstInput = this.parsFunction(this.secondInput * this.USDtoEUR);
      break;
      case ("USDUAH"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput * this.USDtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput / this.USDtoUAH);
      break;

      case ("GBPUAH"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput * this.GBPtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput / this.GBPtoUAH);
      break;
      case ("UAHGBP"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput / this.GBPtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput * this.GBPtoUAH);
      break;
      
      case ("GBPEUR"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput * this.GBPtoUAH / this.EURtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput * this.EURtoUAH / this.GBPtoUAH);
      break;
      case ("EURGBP"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput * this.EURtoUAH / this.GBPtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput * this.GBPtoUAH / this.EURtoUAH);
      break;
      case ("USDGBP"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput * this.USDtoUAH / this.GBPtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput * this.GBPtoUAH / this.USDtoUAH);
      break;
      case ("GBPUSD"):
        logic === 1 ? this.secondInput = this.parsFunction(this.firstInput * this.GBPtoUAH / this.USDtoUAH)
                    : this.firstInput = this.parsFunction(this.secondInput * this.USDtoUAH / this.GBPtoUAH);
      break;

      case ("USDUSD"):
        logic === 1 ? this.secondInput = this.firstInput : this.firstInput = this.secondInput;
      break;
      case ("EUREUR"):
        logic === 1 ? this.secondInput = this.firstInput : this.firstInput = this.secondInput;
      break;
      case ("UAHUAH"):
        logic === 1 ? this.secondInput = this.firstInput : this.firstInput = this.secondInput;
      break;
      case ("GBPGBP"):
        logic === 1 ? this.secondInput = this.firstInput : this.firstInput = this.secondInput;
      break;
      default:
        break;
    }
  }


  ngOnInit() {
    this.http.get("https://api.monobank.ua/bank/currency")
    .subscribe((data: any) => {
      this.USDtoUAH = data[0].rateSell;
      this.EURtoUAH = data[1].rateSell;
      this.USDtoEUR = data[2].rateSell;
      this.GBPtoUAH = data[3].rateCross;
    });
  }
}

interface Currency {
  value: string;
}