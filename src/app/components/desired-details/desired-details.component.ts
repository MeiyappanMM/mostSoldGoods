import { Component, OnInit, ViewChild } from "@angular/core";

import { Billing } from "../../models/billing";
import { Search } from "../../models/search";
import { BillingService } from "../../services/billing.service";
@Component({
  selector: "app-desired-details",
  templateUrl: "./desired-details.component.html",
  styleUrls: ["./desired-details.component.css"]
})
export class DesiredDetailsComponent implements OnInit {
  billings: Billing[];
  search: Search ={
    SearchFrom: 0,
    SearchTo: 0,
    SearchCategory: 'All Categories'
  }
  filteredList: Billing[];
  @ViewChild("searchForm", { static: false }) form: any;
  constructor(private billingService: BillingService) {}

  ngOnInit() {
    this.billingService.getBillings().subscribe(billings => {
      this.billings = billings;
      // console.log(new Date(billings[1].Date).getMonth());
    });
  }
  onSubmit({ value, valid }: { value: Search; valid: boolean }) {
    // this.filteredList = this.billings.filter((value: Billing) => {
    var from = Number(value.SearchFrom);
    var to = Number(value.SearchTo);
    // });
    if(valid)
    {
      this.billingService.getBillings().subscribe(billings =>{

        billings.forEach(read =>{
          if(from <= new Date(read.Date).getMonth() && new Date(read.Date).getMonth() <= to)
          {
            if(value.SearchCategory == "All Categories")
              console.log(read);
            else if(value.SearchCategory == read.Category)
              console.log(read);
          }
        });
      })
      // console.log(value.SearchFrom);
    }
  }


}
