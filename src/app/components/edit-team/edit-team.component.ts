import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  teamId:any;
  team:any={};
  teamForm!:FormGroup;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private teamService:TeamService) { }

  ngOnInit(){
    this.teamId=this.activatedRoute.snapshot.params['id'];
    // let teamsTable=JSON.parse(localStorage.getItem("teams")||'[]');
    // for (let i = 0; i < teamsTable.length; i++) {
    //  if (teamsTable[i].id==this.teamId) {
    //   this.team=teamsTable[i];
    //   break;  
    //  }
      
    // }
    this.teamService.getTeamById(this.teamId).subscribe((data)=>
      {
        console.log("here is the team",data);
        this.team=data.team;
      });
    }
    editTeam() {
      this.teamService.editTeam(this.team).subscribe((response)=>{
        console.log("the team is edited : ",response.isEdited);
        this.router.navigate(['admin']);
      })
    }
  }
  // editTeam(){
  //   let teamsTable=JSON.parse(localStorage.getItem("teams")||'[]');
  //   for (let i = 0; i < teamsTable.length; i++) {
  //    if (teamsTable[i].id==this.teamId) {
  //     teamsTable[i]=this.team;
  //     break;  
  //    }
      
  //   }
  //   localStorage.setItem("teams",JSON.stringify(teamsTable));
  //   this.router.navigate(['admin']);
  // }*



