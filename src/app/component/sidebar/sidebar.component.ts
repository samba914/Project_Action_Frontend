import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  isLoggedIn=false;
  constructor(private storageService: StorageService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();;
  }

}
