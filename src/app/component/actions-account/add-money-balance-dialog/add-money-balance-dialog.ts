import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from "@angular/core";
import {ApiService} from "../../../service/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
declare var paypal :any;

@Component({
  selector: 'add-money-balance-dialog',
  templateUrl: './add-money-balance-dialog.html',
})
export class AddMoneyBalanceDialog implements AfterViewInit{
  amountTocharge = 0;
  // @ts-ignore
  @ViewChild('paypal') paypalElement: ElementRef;
  constructor(private apiService : ApiService,
              public dialogRef: MatDialogRef<AddMoneyBalanceDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  initPaypal(){
    const self = this;
    paypal.Buttons({
      style: {
        layout: 'horizontal',
        color:  'silver',
      },
      createOrder: function(data:any, actions:any) {
        //var tt= Number($("#p-total").text().split('$')[0]);
        return actions.order.create({
          purchase_units: [{
            amount: {
              value:self.amountTocharge//tt
            }
          }]
        });
      },
      onApprove: function(data:any, actions:any) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details:any) {
          self.addAcountBalance()
        });
      },
      onError: function (err:any) {
        alert("Une erreur est survenue! Veillez vérifier vos moyens de paiement.");
      },
      onCancel: function (data:any) {
        alert("Une erreur est survenue! Veillez vérifier vos moyens de paiement.");
      }
    }).render(this.paypalElement.nativeElement);
  }

  addAcountBalance(){
    this.apiService.addToAccountBalance(this.amountTocharge,this.data.userEmail).subscribe(
      data=>{
        this.dialogRef.close(data.balanceAmount);
      }
    );
  }

  ngAfterViewInit(): void {
    this.initPaypal();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
