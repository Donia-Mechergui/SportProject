import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  playerForm!: FormGroup;
  player: any = {};
  playerId: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private playerService:PlayerService) { }

  ngOnInit() {
    this.playerId = this.activatedRoute.snapshot.params['id'];
    // let playersTable = JSON.parse(localStorage.getItem("players") || '[]');
    // for (let i = 0; i < playersTable.length; i++) {
    //   if (playersTable[i].id == this.playerId) {
    //     this.player = playersTable[i];
    //     break;
    //   }

    // }
    this.playerService.getPlayerById(this.playerId).subscribe((data)=>
    {
      console.log("here is the player",data);
      this.player=data.player;
    })
  }
  editPlayer() {
    // let playersTable = JSON.parse(localStorage.getItem("players") || '[]');
    // for (let i = 0; i < playersTable.length; i++) {
    //   if (playersTable[i].id == this.playerId) {
    //     playersTable[i] = this.player;
    //     break;
    //   }

    // }
    // localStorage.setItem("players", JSON.stringify(playersTable));
    // this.router.navigate(['admin']);
    this.playerService.editPlayer(this.player).subscribe((data)=>{
      console.log("the player is edited : ",data.isEdited);
      this.router.navigate(['admin']);
    })
  }

}
