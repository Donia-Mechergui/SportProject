import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-search-matches',
  templateUrl: './search-matches.component.html',
  styleUrls: ['./search-matches.component.css']
})
export class SearchMatchesComponent implements OnInit {

  // id de formulaire
  searchForm !: FormGroup;
  matchId: any;
  // searchMatch: any = {};
  foundObject: any ;

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private matchService: MatchService, private router: Router) { }

  ngOnInit() {
    // this.signupForm  : id de la formulaire , ce n'est pas l'object, on doit utiliser .value pour voir les valeurs de la formulaire
    this.searchForm = this.formBuilder.group({
      scoreOne: ['', [Validators.required]],
      scoreTwo: ['', [Validators.required]],
    })
  }
  search() {
    // this.foundObject=[];
    // let matches = JSON.parse(localStorage.getItem("matches") || "[]");
    // for (let i = 0; i < matches.length; i++) {
    //   if (matches[i].scoreOne == this.searchMatch.scoreOne&& matches[i].scoreTwo == this.searchMatch.scoreTwo) {
    //     this.foundObject.push(matches[i]);
    //   }
    // }
    // this.foundObject=matches.filter((elt:any)=>elt.scoreOne == this.searchMatch.scoreOne&& elt.scoreTwo == this.searchMatch.scoreTwo)
    console.log("the form ", this.searchForm.value);
    this.matchService.searchMatch(this.searchForm.value).subscribe((response) => {
      console.log("the Match You Are Searching From FE ", response.foundMatches);
      this.foundObject = response.foundMatches;
    });
  }
}