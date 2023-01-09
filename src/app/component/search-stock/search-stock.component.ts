import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ApiService} from "../../service/api.service";
import {Stock} from "../../model/stock.model";
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css']
})
export class SearchStockComponent implements OnInit{
  @Output() stockChoosenEvent = new EventEmitter<string>();
  myControl = new FormControl();

  options =[
    new Stock("","","","","","","")
  ];

  // @ts-ignore
  filteredOptions: Observable<Stock[]>;
  constructor(private apiService:ApiService) {
  }
  ngOnInit() {
    this.apiService.getAllStock().subscribe(
      data=>{
        this.options=data;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith<string | Stock>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filter(name) : this.options.slice())
          );
      });

  }

  filter(name: string): Stock[] {
    return this.options.filter(option =>{
      if(option.name){
        return ("("+option.symbol+") "+ option.name).toLowerCase().includes(name.toLowerCase())
      }
      return false;

    } );
  }

  displayFn(stock?: Stock): string {
    return stock ? "("+stock.symbol+") "+ stock.name : "";
  }
  onSelectionChanged(event:any){
    this.stockChoosenEvent.emit(this.myControl.value)
  }


  hideSpinner(event : any) {
    /*setTimeout(() => {
      if (event.target.value.lenght < 3) {
        this.filteredOptions = new Observable<Stock[]>();
      }
    }, 1);*/
  }
}
