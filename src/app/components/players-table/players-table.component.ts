import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  playersTable:any;
  // playersTable:any=[{id:1,Name:"halim", nbr:4,position:'FCB',age:16},
  //   {id:2,Name:"mostfa", nbr:5,position:'FCB',age:20},
  //   {id:3,Name:"zoubair", nbr:6,position:'FCB',age:18},
  //   {id:4,Name:"lotfi", nbr:7,position:'FCB',age:30},];
    clickDisplay(id:number){
      alert('player info '+id+" is displayed");
    }
    clickEdit(id:number){
      alert('player info '+id+" is edited");
    }
    deletePlayer(id:number){
    //    for (let i = 0; i <  this.playersTable.length; i++) {
    //   if ( this.playersTable[i].id == id) {
    //     this.playersTable.splice(i, 1);
    //     break; 
    //   }
    // }
    
    // localStorage.setItem("players", JSON.stringify( this.playersTable));

    //   alert('player info '+id+" is deleted");
    this.playerService.deletePlayerById(id).subscribe((response)=> {console.log("here response after delete",response);
  //  autorefersh
      this.playerService.getAllPlayers().subscribe((data)=>{
      console.log("here response from BE",data);
      this.playersTable=data.T; });
    // this.playersTable=JSON.parse(localStorage.getItem("players") || "[]");
  });
   
    }

  constructor(private router:Router,private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getAllPlayers().subscribe((response)=>{
      console.log("here response from BE",response);
      this.playersTable=response.T;
    // this.playersTable=JSON.parse(localStorage.getItem("players") || "[]");
  });
  }
  goToInfo(id:number){
    this.router.navigate([`playerInfo/${id}`]);

  }
  goToEdit(id:number){
    this.router.navigate([`editplayer/${id}`]);

  }

}
