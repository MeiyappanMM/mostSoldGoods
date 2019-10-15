import { Component, OnInit } from '@angular/core';

import { Billing } from '../../models/billing';
import { BillingService } from '../../services/billing.service';
@Component({
  selector: 'app-desired-details',
  templateUrl: './desired-details.component.html',
  styleUrls: ['./desired-details.component.css']
})
export class DesiredDetailsComponent implements OnInit {

  billings:Billing[];
  constructor(private billingService:BillingService) { }

  ngOnInit() {
    this.billingService.getBillings().subscribe(billings =>{
      this.billings = billings;
    });
  }

}
