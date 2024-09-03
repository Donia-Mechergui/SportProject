import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
blogTab:any=[{title:"abc",description:"abcdefgh",date:"19/08/2024"},
  {title:"nfu",description:"ndfkjhshfuhgh",date:"29/06/2024"},
  {title:"jhdhqd",description:"ldksqdgiqmgd",date:"10/07/2024"},
]
  constructor() { }

  ngOnInit(): void {
  }

}
 