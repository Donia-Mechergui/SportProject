import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit { 
  matchId:any;
match: any={};
  constructor(private activatedRoute : ActivatedRoute,private matchService:MatchService) { }

  ngOnInit(){
    // ng on init : pas de retour; elle fait seulement le traitement  et affiche les informations au lancement du composant:demarrage
  
    this.matchId=this.activatedRoute.snapshot.params['id'];
    // let matchesTab=JSON.parse(localStorage.getItem('matches')||'[]');
    // for (let i = 0; i < matchesTab.length; i++) {
    //   if (this.matchId==matchesTab[i].id) {
    //     this.match=matchesTab[i];
    //     break;
       
    //   }
      
    // }
    // console.log("this.match",this.match)
    this.matchService.getMatchById(this.matchId).subscribe((data)=>{
      console.log('her match from backend',data);
      this.match=data.match;

    });
  }

}
