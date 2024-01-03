import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-header-currency',
  templateUrl: './header-currency.component.html',
  styleUrls: ['./header-currency.component.css']
})
export class HeaderCurrencyComponent {
  @Input() USDtoUAH: any;
  @Input() EURtoUAH: any;
  @Input() USDtoEUR: any;
  @Input() GBPtoUAH: any;
}
