import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title:any='Admin';
  // matches:string="Matches";
  // players:string="Players";
  // teams:string="Teams";
 titles:any=["Matches","Players","Teams","Stadium"];
  constructor() { }

  ngOnInit(): void {
  }

}
