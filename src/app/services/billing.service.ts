import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Billing } from "../models/billing";

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  billingsCollection: AngularFirestoreCollection<Billing>;
  billingDoc: AngularFirestoreDocument<Billing>;
  billings: Observable<Billing[]>;
  billing: Observable<Billing>;

  constructor(private afs: AngularFirestore) {
    this.billingsCollection = afs.collection("billing",ref => ref.orderBy('Brand','asc'));
   }

   getBillings():Observable<Billing[]>{
    this.billings = this.billingsCollection.snapshotChanges().pipe(map(changes =>{
      return changes.map(action => {
        const data = action.payload.doc.data() as Billing;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.billings;
   }

   addBilling(billing:Billing){
     this.billingsCollection.add(billing);
   }

}
