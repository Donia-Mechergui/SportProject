import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  playersTab: any=[{name:"Cristiano Ronaldo", age:38, position:"ATK", nbr:7},
    {name:"Harry Kane", age:31, position:"ATK", nbr:9},
    {name:"kylian mbappé", age:26, position:"ATK", nbr:10},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
