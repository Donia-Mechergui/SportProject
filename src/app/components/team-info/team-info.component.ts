import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {
  teamId: any;
  team: any = {};
  constructor(private teamService:TeamService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.teamId = this.activatedRoute.snapshot.params['id'];
    this.teamService.getTeamById(this.teamId).subscribe((response)=>{
    console.log("here is the team from backend",response);
    this.team=response.team; });
  

}}


