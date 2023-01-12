import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {StorageService} from "../../service/storage.service";
import {ApiService} from "../../service/api.service";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Stock} from "../../model/stock.model";
import {MatInput} from "@angular/material/input";
declare var $: any;
declare var Morris: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  // @ts-ignore
  choosenStock : Stock;
  dateOneDate : Date = new Date();
  errorMessage="";
  canSelectDate = false;
  isValid=false;
  stockValues=[]
  activeSearch='';
  showPrices= false;
  highestValue = 0;
  volume =0;
  lowestValue =0;
  // @ts-ignore
  @ViewChild('dateEndInput', { read: MatInput}) dateEndInput: MatInput;
  // @ts-ignore
  @ViewChild('dateStartInput', { read: MatInput}) dateStartInput: MatInput;
  // @ts-ignore
  @ViewChild('dateInput', { read: MatInput}) dateInput: MatInput;
  @ViewChild('stockLineChart') stockLinelementRef: ElementRef | undefined;


  dateRangeStart:Date = new Date(2000, 0, 1);
  dateMinRange :Date = new Date(2000, 0, 1);
  dateRangeEnd: Date|null =new Date(2000, 0, 1);
  //dateSearch or rangeSearch
  typeSearch = "dateSearch";
  morrisChart:any;
  historyLoaded = false;
  history=[]
  historyFiltered:any[]=[]
  constructor(private apiService: ApiService, private storageService: StorageService, private router: Router ) {

  }
  ngOnInit(): void {
      this.checkSearchHistory();

  }
  checkSearchHistory(){
    //this.historyLoaded = true;
    this.apiService.getSearchHistory().subscribe(
      data=>{
        this.history=data;
        this.historyLoaded=true;
        console.log(data);
        this.filterHistory("week");
      }
    );
  }
  saveChoosenStock(event:any){
    this.choosenStock=event;
    this.canSelectDate= true;
    this.showPrices = false;
  }
  changeTypeSearch(type:string){
    this.typeSearch = type;
    this.isValid = false;
    if(this.typeSearch!=="dateSearch"){
      this.dateInput.value='';
    }else{
      this.dateEndInput.value='';
      this.dateStartInput.value='';
    }
  }
  updateOneDate(event : any){
    this.dateOneDate =  new Date(event.target.value);
    this.isValid = true;
  }
  updateDateStart(event:any){
    this.dateRangeStart= new Date(event.target.value);
    let date = new Date(this.dateRangeStart);
    date.setDate(date.getDate()+1);
    this.dateMinRange = date;
    this.dateEndInput.value='';
    this.dateRangeEnd = null;
  }
  updateDateEnd(event:any){
    this.dateRangeEnd = new Date(event.target.value);
    this.isValid = true;
  }
  searchStock(){
    if(this.typeSearch == "dateSearch"){
      this.searchStockByDate();
    }else{
      this.searchStockByRange();
    }
  }

  searchStockByDate(){
    this.showPrices = true;
    this.apiService.getStockByDayWithHoursData(this.choosenStock.symbol,this.choosenStock.name,this.dateOneDate.toLocaleDateString()).subscribe(
      data =>
      {
        this.pricesMethod(data,false);
      });
  }
  searchStockByRange(){
    this.showPrices = true;
    this.apiService.getStockByRange(this.choosenStock.symbol,this.choosenStock.name,this.dateRangeStart.toLocaleDateString(),this.dateRangeEnd!.toLocaleDateString()).subscribe(
      data =>
      {
        this.pricesMethod(data,true);
      }
    );
  }
  pricesMethod(data:any,isRangeSearch:boolean){
    this.stockValues = data;
    console.log(data)
    let minStockPrice = data.reduce(function(prev:any, current:any) {
      return (prev["4. close"] < current["4. close"]) ? prev : current  });

    this.lowestValue = Number(minStockPrice["4. close"]);

    this.highestValue = Number( data.reduce(function(prev:any, current:any) {
      return (prev["4. close"] > current["4. close"]) ? prev : current  })["4. close"])

    this.volume = data.reduce((acc:any, curr:any) => acc + Number(curr["6. volume"]), 0)

    let el = this.stockLinelementRef?.nativeElement
    if(el.firstChild) {
      el.removeChild(el.firstChild);
      this.morrisChart.setData([]);
    }
    this.morrisChart = Morris.Area({
      // ID of the element in which to draw the chart.
      element: 'stockLineChart',
      resize: true,
      data: data,
      xkey: 'date',
      ykeys: ['4. close'],
      xLabels: "day",
      ymin:minStockPrice["4. close"],
      labels: ['Prix'],
      gridLineColor: 'transparent',
      lineColors: ['#4d7cff'],
      lineWidth: 1,
      parseTime:true,
      hideHover: 'auto',
      yLabelFormat: function (y:any) {return y.toFixed(2).toString() + ' $';},
      xLabelFormat: isRangeSearch?this.dateRangeFormat:this.oneDateRangeFormat,
      dateFormat : isRangeSearch?this.dateRangeFormat:this.oneDateRangeFormat
    });
    this.checkSearchHistory();
  }
  dateRangeFormat (x:any) {
    return new Date(x).toLocaleDateString();
  }
  oneDateRangeFormat (x:any) {
    return new Date(x).toLocaleTimeString();
  }

  filterHistory(filterMode:string){
    this.activeSearch=filterMode;
    if(filterMode==="day"){
      this.historyFiltered=this.history.filter(value => {
        return new Date(value["date"]).toLocaleDateString() === new Date().toLocaleDateString();
      })
    }else if(filterMode == "week"){
      this.historyFiltered=this.history.filter(value => {
        let current =new Date();
        let start = new Date();
        start.setDate(current.getDate()-7);
        return start <= new Date(value["date"])  && new Date(value["date"]) <=current;
      });
    }else if (filterMode == "month"){
      this.historyFiltered=this.history.filter(value => {
        let current =new Date();
        let start = new Date();
        start.setDate(current.getDate()-30);
        return start <=new Date(value["date"])  && new Date(value["date"]) <=current;
      });
    }
    this.reduce();

  }
  getMonday(date :Date) {
    let d = new Date(date);
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  reduce(){
    console.log(this.historyFiltered)
    let map= (this.historyFiltered.reduce(function(obj, pet){
      if (!obj[pet["symbol"]]) {
        // @ts-ignore
        obj[pet["symbol"]] = {name:pet["name"],symbol:pet["symbol"],count:1};
      } else {
        obj[pet["symbol"]]["count"]++;
      }
      return obj;
    }, []));
    let items = Object.keys(map).map(function(key) {
      // @ts-ignore
      return map[key];
    });
    items.sort(function(first, second) {
      // @ts-ignore
      return second["count"] - first["count"];
    });
    console.log(items)
    this.historyFiltered=items.slice(0, 5);

  }

}

