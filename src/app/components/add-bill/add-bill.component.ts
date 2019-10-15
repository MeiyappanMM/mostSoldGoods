import { Component, OnInit, ViewChild } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

import { BillingService } from "../../services/billing.service";
import { Billing } from "../../models/billing";
@Component({
  selector: "app-add-bill",
  templateUrl: "./add-bill.component.html",
  styleUrls: ["./add-bill.component.css"]
})
export class AddBillComponent implements OnInit {
  billing: Billing = {
    Category: "",
    SubCategory: "",
    Brand: "",
    ProductName: "",
    Quantity: 0,
    Price: 0,
    Date: ""
  };

  @ViewChild("billingForm", { static: false }) form: any;
  constructor(
    private flashMessage: FlashMessagesService,
    private billingService: BillingService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Billing; valid: boolean }) {
    // if(this.disableBalanceOnAdd){
    //   value.balance=0;
    // }
    if (!valid) {
      //show error
      this.flashMessage.show("Please fill out the form correctly", {
        cssClass: "alert-danger",
        timeout: 4000
      });
    } else {
      //add client
      this.billingService.addBilling(value);
      //show message
      this.flashMessage.show("billing Added", {
        cssClass: "alert-success",
        timeout: 4000
      });
      //go back to dash
      this.router.navigate(["/"]);
    }
  }
}
