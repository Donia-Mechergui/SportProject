import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matchesTable:any=[];
  constructor(private matchService:MatchService) { }
  ngOnInit(){
    this.matchService.getAllMatches().subscribe((data)=>{
      console.log(data.T);
      this.matchesTable=data.T;
    });
  }
}
