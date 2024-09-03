import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-search-players',
  templateUrl: './search-players.component.html',
  styleUrls: ['./search-players.component.css']
})
export class SearchPlayersComponent implements OnInit {
  searchPlayerForm!:FormGroup;
  foundObjectTab:any=[];
  constructor(private formBuilder:FormBuilder,private playerService:PlayerService) { }

  ngOnInit() {
    this.searchPlayerForm = this.formBuilder.group({age:['',[Validators.required]]})
  }
searchPlayer(){

  // let players = JSON.parse(localStorage.getItem("players") || "[]");
  // this.foundObjectTab=players.filter((elt:any) => elt.age >= this.searchPlayerForm.value.age) ;
  // console.log(this.foundObjectTab);
  console.log("the form",this.searchPlayerForm.value)
  this.playerService.searchPlayer(this.searchPlayerForm.value).subscribe((response) => {
    console.log("The Player You Are Searching From FE ", response.foundPlayers);
    this.foundObjectTab = response.foundPlayers;
  });
  
}

} 
