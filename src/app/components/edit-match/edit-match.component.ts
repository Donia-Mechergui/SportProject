import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
  matchForm!: FormGroup;
  match: any = {};
  matchId: any;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private matchService: MatchService) { }


  // ngOnInit() {
  //   this.matchId = this.activatedRoute.snapshot.params['id'];
  //   let matchesTable = JSON.parse(localStorage.getItem("matches") || '[]');
  //   const numericMatchId = Number(this.matchId);
  //   for (let i = 0; i < matchesTable.length; i++) {
  //     if (matchesTable[i].id === numericMatchId) {
  //       this.match = matchesTable[i];
  //       break; 
  //     }
  //   }
  //   console.log("this.match",this.match)
  // }
  ngOnInit() {
    // pour recuperer l'id en utilisant instance activatedRoute 
    this.matchId = this.activatedRoute.snapshot.params['id'];
    // console.log('matchId:', this.matchId);  // Log matchId

    // let matchesTable = JSON.parse(localStorage.getItem("matches") || '[]');
    // console.log('matchesTable:', matchesTable);  // Log matchesTable   
    // for (let i = 0; i < matchesTable.length; i++) {
    //   console.log('Checking match:', matchesTable[i]);  // Log each match being checked
    //   if (matchesTable[i].id == this.matchId) {
    //     this.match = matchesTable[i];

    //   }
    // }
    this.matchService.getMatchById(this.matchId).subscribe((response) => {
      this.match = response.match
    });
    // pour remplir le formulaire dynamiquement: les anciennes valeurs
  }
  editMatch() {
    // let matchesTable=JSON.parse(localStorage.getItem("matches")||'[]');
    // for (let i = 0; i <  matchesTable.length; i++) {
    //   if (matchesTable[i].id == this.matchId) {
    //    matchesTable[i] =this.match;
    //     break; 
    //   }
    // }

    // localStorage.setItem("matches", JSON.stringify(matchesTable));
    this.matchService.editMatch(this.match).subscribe((response) => {
      console.log("the match is edited", response.isEdited);
      this.router.navigate(['admin']);
    });
    //    matchesTable[i] =this.match)


  }
}



