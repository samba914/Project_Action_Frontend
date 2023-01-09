import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + '/stocks/all');
  }

  getAccountDetails(email : string ): Observable<any> {
    return this.http.get(API_URL + `/account/getAccount/${email}`);
  }
  addToAccountBalance(amount : number, email : string): Observable<any> {
    return this.http.put( API_URL+ `/account/addToAccountBalance/${email}`,{amount: amount},httpOptions);
  }
  addAction(email : string, symbol :string , name:string ,quantity : number,purchasePrice:number): Observable<any> {
    return this.http.put( API_URL+ `/account/addAction/${email}`,{stockName: name,stockSymbol: symbol, stockQuantity: quantity, purchasePrice : purchasePrice },httpOptions);
  }
  reduceAction(email : string, symbol :string , name:string ,quantity : number,purchasePrice:number): Observable<any> {
    return this.http.put( API_URL+ `/account/reduceAction/${email}`,{stockName: name,stockSymbol: symbol, stockQuantity: quantity, purchasePrice : purchasePrice },httpOptions);
  }
  getAllStock(): Observable<any> {
    return this.http.get( API_URL+ '/stocks/getAllStock');
  }
  getStockByRange(symbol:string,stockName:string, dateStart : string , dateEnd : string): Observable<any> {
    return this.http.get( API_URL+ `/stocks/getStockByRange?symbol=${symbol}&stockName=${encodeURIComponent(stockName)}&dateStart=${encodeURIComponent(dateStart)}&dateEnd=${encodeURIComponent(dateEnd)}`);
  }
  getStockByDayWithHoursData(symbol:string,stockName:string, date : string ): Observable<any> {
    return this.http.get( API_URL+ `/stocks/getStockByDayWithHoursData?symbol=${symbol}&stockName=${encodeURIComponent(stockName)}&date=${encodeURIComponent(date)}`);
  }
  getStockLastDay(symbol:string): Observable<any> {
    return this.http.get( API_URL+ `/stocks/getStockLastDay?symbol=${symbol}`);
  }
  getSearchHistory():Observable<any> {
    return this.http.get( API_URL+ `/stocks/getSearchHistory`);
  }



}
