import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  // object
  match: any = {};
  // id de formulaire
  matchForm !: FormGroup;

  constructor(private matchService: MatchService, private router: Router) { }

  ngOnInit(): void {
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
  addMatch() {
    // console.log("add match been clicked", this.match);
    // let matches = JSON.parse(localStorage.getItem("matches") || "[]");
    // this.match.id=this.generateId(matches);
    // matches.push(this.match);
    // localStorage.setItem("matches", JSON.stringify(matches));
    this.matchService.addMatch(this.match).subscribe((response) => { 
      console.log("here response after adding match", response);
      this.router.navigate(['/admin']);
    
    });
  } }
