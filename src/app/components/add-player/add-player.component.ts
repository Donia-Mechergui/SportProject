import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  // T: any=[{x:0,tab:[4,8,5]},{x:3,tab:[10,4]},]
     // object
     player:any={};
     teams:any=[];
     // id de formulaire
     playerForm !:FormGroup;

  constructor(private playerService:PlayerService,private router:Router,private teamService:TeamService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe((data)=>{
      console.log("here are teams ",data.T)
      this.teams=data.T;
    })
  }
  addPlayer(){
    console.log("add team been clicked",this.player);
    //   let players = JSON.parse(localStorage.getItem("players") || "[]");
    //   this.player.id=this.generateId(players);
    //   players.push(this.player);
    //   localStorage.setItem("players", JSON.stringify(players));
    this.playerService.addPlayer(this.player).subscribe((response) => { 
      console.log("here response after adding player", response.msg);
      this.router.navigate(['/admin']);
    
    });
  }
  generateId(T:any){
    let max;
    if (T.length==0) {
      max=0;    
    } else {
      max=T[0].id;
      for (let i = 1; i < T.length; i++) {
        if (T[i].id>max) {
          max=T[i].id;   
        }  
      }  
    }
    return max+1;
  }


}


