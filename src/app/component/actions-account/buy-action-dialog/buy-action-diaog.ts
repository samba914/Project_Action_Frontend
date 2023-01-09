import {Component, Inject, OnInit} from "@angular/core";
import {ApiService} from "../../../service/api.service";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Stock} from "../../../model/stock.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'buy-action-dialog',
  templateUrl: './buy-action-dialog.html',
})


export class BuyActionDiaog implements OnInit{
  // @ts-ignore
  choosenStock : Stock;
  stockDayDetails = null;
  showStockDetails = false;
  stockPrice = 0;
  amountToBuy = 0;
  showErrorMessage= false;
  quantityToBuy =0;
  constructor(private apiService : ApiService,
              public dialogRef: MatDialogRef<BuyActionDiaog>,
              @Inject(MAT_DIALOG_DATA) public givenData: any) { }
  ngOnInit() {
    if(this.givenData.stockIsSelected){
      this.showStockDetails=false;
      this.stockPrice = 0;
      this.choosenStock=this.givenData.stock;
      this.apiService.getStockLastDay(this.choosenStock.symbol).subscribe(
        data=>{
          console.log(data)
          if(data!=null && data["4. close"]){
            this.showStockDetails=true;
            this.stockPrice = data["4. close"];
          }
        }
      );
    }

  }

  quantityChange(event:any){
    this.amountToBuy = this.quantityToBuy * this.stockPrice;
    this.checkValidity();
  }
  checkValidity(){
    this.showErrorMessage = false;
    if(this.givenData.isAddMethod && this.amountToBuy> this.givenData.balanceAmount){
      this.showErrorMessage = true;
    }else if(!this.givenData.isAddMethod && this.quantityToBuy>this.givenData.stock.quantity ){
      this.showErrorMessage = true;
    }
  }
  amountToBuyChange(event:any){
    this.quantityToBuy=this.amountToBuy/this.stockPrice;
    this.checkValidity();
  }

  saveChoosenStock(event:any){
    this.showStockDetails=false;
    this.choosenStock=event;
    this.stockPrice = 0;
    this.apiService.getStockLastDay(this.choosenStock.symbol).subscribe(
      data=>{
        console.log(data)
        if(data!=null && data["4. close"]){
          this.showStockDetails=true;
          this.stockPrice = data["4. close"];
        }
      }
    );
  }

  proceedToBuy(){
    this.apiService.addAction(this.givenData.userEmail, this.choosenStock.symbol, this.choosenStock.name, this.quantityToBuy, this.amountToBuy).subscribe(
      data=>{
        this.dialogRef.close(data);
      }
    );
  }

  proceedToSell(){
    console.log("sell");
    this.apiService.reduceAction(this.givenData.userEmail, this.choosenStock.symbol, this.choosenStock.name, this.quantityToBuy, this.amountToBuy).subscribe(
      data=>{
        this.dialogRef.close(data);
      }
    );
    /*this.apiService.addAction(this.givenData.userEmail, this.choosenStock.symbol, this.choosenStock.name, this.quantityToBuy, this.amountToBuy).subscribe(
      data=>{
        this.dialogRef.close(data);
      }
    );*/
  }

}
