import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  m:any={scoreone:1,scoretwo:3,teamone:'ca',teamtwo:'fsb'};

  constructor() { }

  ngOnInit(): void {
  }

}
