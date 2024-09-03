import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
decodedUser:any;
  constructor( private router:Router) { }

  ngOnInit() {
  }
isLoggedIn(){
  let tokenUser:any=sessionStorage.getItem("token");
  if (tokenUser) {
    this.decodedUser = jwtDecode(tokenUser);
    console.log("role",this.decodedUser.role)
  }
  // !true:false
  // !!null:false
  // !!true:true:le resultat sera toujours en booleen
  // !!tokenUser: true /false pas null ou bien chaine encodée
  return !!tokenUser;

}
logOut(){
  sessionStorage.removeItem("token");
  this.router.navigate(['']);

}
}
