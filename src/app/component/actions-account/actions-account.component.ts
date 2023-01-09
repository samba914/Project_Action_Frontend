import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../service/api.service";
import {StorageService} from "../../service/storage.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthService} from "../../service/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {BuyActionDiaog} from "./buy-action-dialog/buy-action-diaog";
import {AddMoneyBalanceDialog} from "./add-money-balance-dialog/add-money-balance-dialog";

declare var paypal :any;

@Component({
  selector: 'app-actions-account',
  templateUrl: './actions-account.component.html',
  styleUrls: ['./actions-account.component.css']
})
export class ActionsAccountComponent implements OnInit{
  accountBalance = 0;
  listeActifs = [];
  userEmail= "";
  displayedColumns = [ 'name', 'symbol' , 'quantity',"action"];

  constructor( private storageService: StorageService ,private apiService : ApiService, public dialog: MatDialog) {
  }
  ngOnInit(): void {
      let user = this.storageService.getUser();
      this.userEmail = user.email
      this.apiService.getAccountDetails(this.userEmail).subscribe(
        data=>{
            this.accountBalance = data.balanceAmount;
            this.listeActifs = data.actifs;
        }
      );

  }

  openDialogAddAction():void {

    let dialogActionRef = this.dialog.open(BuyActionDiaog, {
      width: '500px',
      data : {balanceAmount : this.accountBalance,userEmail : this.userEmail,isAddMethod:true,stockIsSelected:false}
    });

    dialogActionRef.afterClosed().subscribe(result => {
      if(result){
        this.accountBalance = result.balanceAmount;
        this.listeActifs = result.actifs
      }

    });
  }
  openDialogAddQuanityAction(stockChoosen:any):void {

    let dialogActionRef = this.dialog.open(BuyActionDiaog, {
      width: '500px',
      data : {balanceAmount : this.accountBalance,userEmail : this.userEmail,stockIsSelected:true, stock:stockChoosen, isAddMethod:true }
    });

    dialogActionRef.afterClosed().subscribe(result => {
      if(result){
        this.accountBalance = result.balanceAmount;
        this.listeActifs = result.actifs
      }

    });
  }
  openDialogReduceQuanityAction(stockChoosen:any):void {
    let dialogActionRef = this.dialog.open(BuyActionDiaog, {
      width: '500px',
      data : {balanceAmount : this.accountBalance,userEmail : this.userEmail,stockIsSelected:true, stock:stockChoosen, isAddMethod:false }
    });

    dialogActionRef.afterClosed().subscribe(result => {
      if(result){
        this.accountBalance = result.balanceAmount;
        this.listeActifs = result.actifs
      }

    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddMoneyBalanceDialog, {
      width: '300px',
      data : {userEmail : this.userEmail}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.accountBalance = result;
      }

    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   // this.dataSource.filter = filterValue;
  }

  //sb-zhklj23430071@personal.example.com
//T+<2k$Dr
}








