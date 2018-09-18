import {Component} from '@angular/core';
import {ContractsService} from "./services/contracts/contracts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public round: number;
  public amountAccepted: number;

  constructor(cs: ContractsService) {
    cs.getRound().then(round => this.round = round);
    cs.getAmountAccepted().then(amountAccepted => this.amountAccepted = amountAccepted);
    cs.getEvents();
  }
}
