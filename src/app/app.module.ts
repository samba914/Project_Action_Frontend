import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { HomeComponent } from './component/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {httpInterceptorProviders} from "./helpers/http.interceptor";
import {ErrorHttpInterceptorProviders} from "./helpers/error-handle.interceptor";
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { AccountBalanceComponent } from './component/account-balance/account-balance.component';
import {ActionsAccountComponent} from './component/actions-account/actions-account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material/table";
import {BuyActionDiaog} from "./component/actions-account/buy-action-dialog/buy-action-diaog";
import {AddMoneyBalanceDialog} from "./component/actions-account/add-money-balance-dialog/add-money-balance-dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { SearchStockComponent } from './component/search-stock/search-stock.component';
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import { MatBadgeModule } from '@angular/material/badge';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    SidebarComponent,
    TopbarComponent,
    AddMoneyBalanceDialog,
    AccountBalanceComponent,
    ActionsAccountComponent,
    BuyActionDiaog,
    SearchStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule


  ],
  providers: [httpInterceptorProviders,ErrorHttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
