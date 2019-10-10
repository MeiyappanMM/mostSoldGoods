import { Component, OnInit, ViewChild } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

import { ProductService } from "../../services/product.service";
import { Product } from "../../models/Product";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  product: Product = {
    Category: "",
    SubCategory: "",
    Brand: "",
    ProductName: "",
    Quantity: "",
    Price: 0,
    NoOfSoldUnits: 0
  };

  @ViewChild("productForm", { static: false }) form: any;
  constructor(
    private flashMessage: FlashMessagesService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Product; valid: boolean }) {
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
      this.productService.addProduct(value);
      //show message
      this.flashMessage.show("Product Added", {
        cssClass: "alert-success",
        timeout: 4000
      });
      //go back to dash
      this.router.navigate(["/"]);
    }
  }
}
