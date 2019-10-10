import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  products: Observable<Product[]>;
  product: Observable<Product>;

  constructor(private afs: AngularFirestore) {
    this.productsCollection = afs.collection("products",ref => ref.orderBy('ProductName','asc'));
   }

   getProducts():Observable<Product[]>{
    this.products = this.productsCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(action => {
        const data = action.payload.doc.data() as Product;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.products;
   }

   addProduct(product:Product){
     this.productsCollection.add(product);
   }

}
