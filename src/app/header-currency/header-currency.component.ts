import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-header-currency',
  templateUrl: './header-currency.component.html',
  styleUrls: ['./header-currency.component.css']
})
export class HeaderCurrencyComponent {
  @Input() USDtoUAH: number = 0;
  @Input() EURtoUAH: number = 0;
  @Input() USDtoEUR: number = 0;
  @Input() GBPtoUAH: number = 0;
}
