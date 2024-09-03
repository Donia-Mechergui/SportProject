import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  playerId: any;
  player: any = {};
  constructor(private playerService: PlayerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.playerId = this.activatedRoute.snapshot.params['id'];
    this.playerService.getPlayerById(this.playerId).subscribe((response)=>{
    console.log("here is the player from backend",response);
    this.player=response.player; });
  

}}
