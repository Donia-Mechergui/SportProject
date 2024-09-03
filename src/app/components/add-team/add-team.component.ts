import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
   // object
   team:any={};
   // id de formulaire
   teamForm !:FormGroup;

  constructor(private teamService:TeamService, private router:Router) { }

  ngOnInit(): void {
  }
  addTeam(){
    // console.log("add team been clicked",this.team);
    // let teams = JSON.parse(localStorage.getItem("teams") || "[]");
    // this.team.id=this.generateId(teams);
    // teams.push(this.team);
    // localStorage.setItem("teams", JSON.stringify(teams));
    this.teamService.addTeam(this.team).subscribe((response) => { 
      console.log("here response after adding team", response);
      this.router.navigate(['/admin']);
    
    });
  }
  // generateId(T:any){
  //   let max;
  //   if (T.length==0) {
  //     max=0;    
  //   } else {
  //     max=T[0].id;
  //     for (let i = 1; i < T.length; i++) {
  //       if (T[i].id>max) {
  //         max=T[i].id;   
  //       }  
  //     }  
  //   }
  //   return max+1;
  // }

}
