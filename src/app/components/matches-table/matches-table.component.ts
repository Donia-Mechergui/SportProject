import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matchesTable:any;
  matchForm !: FormGroup;

  // matchesTable: any = [{ id: 1, scoreone: 2, scoretwo: 4, teamone: 'FCB', teamtwo: 'RMD', result: "" },
  // { id: 2, scoreone: 8, scoretwo: 5, teamone: 'FCB', teamtwo: 'EST', result: "" },
  // { id: 3, scoreone: 9, scoretwo: 6, teamone: 'EST', teamtwo: 'RMD', result: "" },
  // { id: 4, scoreone: 3, scoretwo: 7, teamone: 'LIV', teamtwo: 'CIT', result: "" },
  // { id: 4, scoreone: 3, scoretwo: 3, teamone: 'FCB', teamtwo: 'CIT', result: "" }];
  clickDisplay(id: number) {
    alert('match info ' + id + " is displayed");
  }
  clickEdit(id: number) {
    alert('match info ' + id + " is edited");
  }
  clickDelete(id: number) {
    alert('match info ' + id + " is deleted");
  }

  constructor(private router:Router, private matchservice: MatchService) { }

  ngOnInit() {
    // this.matchesTable=JSON.parse(localStorage.getItem("matches") || "[]");
    this.matchservice.getAllMatches().subscribe((response)=>{
      console.log("here response from BE",response);
      this.matchesTable=response.T;

      // reponse a partir le service by subscribe et en choisissat le parametre response
      // subscribe a un parametre de type arrow function : it picks the response from the service et it is going to be displayed in an arrow function
    });
  
  }
  // drawTest(a: number, b: number): string {
  //   if (a === b) {
  //     return 'white';
  //   }
  //   return ''; // Return an empty string or another appropriate value if they are not equal
  // }

  // scoreResult(s1: number, s2: number): string {
  //   if (s1 > s2) {
  //     return 'win';
  //   } else if (s1 < s2) {
  //     return 'loss';
  //   } else {
  //     // return this.drawTest(s1, s2);  // Correct call to drawTest
  //   }
  // }
  tableScoreResult(s1: number, s2: number, teamtwo : string){
    if (s1<s2) {
      return ['green',' win',teamtwo];
      
    } else  if(s1>s2){
      return ['red',' loss',teamtwo];
      
    }
    else {
      return ['white',' ',' draw'];
    }
    }
   
  deleteMatch(id:number) {
      // let matchesTable = JSON.parse(localStorage.getItem("matches") || "[]");
      //  this.matchesTable : already exists in ngoninit+la mise a jour automatique
      
      // for (let i = 0; i <  this.matchesTable.length; i++) {
      //   if ( this.matchesTable[i].id == id) {
      //     this.matchesTable.splice(i, 1);
      //     break; 
      //   }
      // }
      
      // localStorage.setItem("matches", JSON.stringify( this.matchesTable));
      this.matchservice.deleteMatchById(id).subscribe((response)=> {console.log("here response after delete",response);
        // pour faire l'auto refersh , on fait l'etape suivante dans l'arrow function:on recupere le tableau apres la suppression de'un element
        this.matchservice.getAllMatches().subscribe((data)=>{
          console.log("here the data from BE",data);
          this.matchesTable=data.T;
            });
      });
     
      


    }
    goToInfo(id:number){
      this.router.navigate([`matchInfo/${id}`]);

    }
 
    goToEdit(id:number){
      this.router.navigate([`editmatch/${id}`]);
  
    }
  resultColor(s1: number, s2: number) {
    if (s1 > s2) {
      return 'green';

    } else if (s1 < s2) {
      return 'red';

    } else {
      return 'white';
    }
    
  }
 
}


