import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  teamsTable: any;
  // =[{id:1,name:2, owner:"SALAH",foundation:1919},
  //   {id:2,name:"FSB", owner:"SALAH",foundation:1919},
  //   {id:3,name:"CIT", owner:"HEDI",foundation:1919},];
  clickDisplay(id: number) {
    alert('match info ' + id + " is displayed");
  }
  clickEdit(id: number) {
    alert('match info ' + id + " is edited");
  }
  clickDelete(id: number) {
    alert('match info ' + id + " is deleted");
  }
  affichage(id: number, ch: string) {
    alert("team number " + id + " " + ch)
  }

  constructor(private router:Router, private teamservice: TeamService) { }

  // ngOnInit() {
  //   this.teamsTable = JSON.parse(localStorage.getItem("teams") || "[]");
  // }
  ngOnInit() {
    // this.matchesTable=JSON.parse(localStorage.getItem("matches") || "[]");
    this.teamservice.getAllTeams().subscribe((response)=>{
      console.log("here is the teams table including the players table",response.T);
      this.teamsTable=response.T;

      // reponse a partir le service by subscribe et en choisissat le parametre response
      // subscribe a un parametre de type arrow function : it picks the response from the service et it is going to be displayed in an arrow function
    });
  }
  deleteTeam(id: number) {
    // for (let i = 0; i < this.teamsTable.length; i++) {
    //   if (this.teamsTable[i].id == id) {
    //     this.teamsTable.splice(i, 1);
    //     break;
    //   }
    // }

    // localStorage.setItem("teams", JSON.stringify(this.teamsTable));
    this.teamservice.deleteTeamById(id).subscribe((response)=> {console.log("here response after delete",response);
    this.teamservice.getAllTeams().subscribe((data)=>{
      console.log("here data from BE",data);
      this.teamsTable=data.T;    });
    });

  }
  goToInfo(id:number){
    this.router.navigate([`teamInfo/${id}`]);

  }
  goToEdit(id:number){
    this.router.navigate([`editteam/${id}`]);

  }

}
