import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stadium-table',
  templateUrl: './stadium-table.component.html',
  styleUrls: ['./stadium-table.component.css']
})
export class StadiumTableComponent implements OnInit {
  stadiumtable: any=[{id:1,name:"Rades",country:"tunisia",capacity:6500},{ id:2,name:"camp new",country:"spain",capacity:7500},{id:3,name:"Parc des princes",country:"thailand",capacity:9000},]

  constructor() { }

  ngOnInit(): void {
  }

}
