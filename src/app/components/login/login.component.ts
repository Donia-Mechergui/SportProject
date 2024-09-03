import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  user: any = {};
  msgError: any = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  // login() {
  //   console.log("here object", this.user);
  //   this.userService.login(this.user).subscribe((response) => {
  //     console.log("response", response.msg, response.user);

  //     if (response.msg == "welcome") {
  //       if (response.user.role == "admin") {
  //         this.router.navigate(['admin']);
  //       }
  //       else {
  //         this.router.navigate(['']);
  //       }
  //     }else {
  //         this.msgError = "pwd or email  not correct";
  //       }
  //     });
  // }
  login() {
    console.log("here object", this.user);
    this.userService.login(this.user).subscribe((response) => {
      console.log("response", response.msg, response.user);
     
      if (response.user) {
        let decodedUser:any = jwtDecode(response.user);
        // on a sauvegarde response.user :security:token encoded string
        sessionStorage.setItem("token",response.user);
        // sessionStorage.setItem("token",decodedUser.id);
        // id de app.js, 
        console.log("decoded",decodedUser);
        if (decodedUser.role == "admin") {
          this.router.navigate(['admin']);
        }
        else {
          this.router.navigate(['']);
        }
      }else {
          this.msgError ="please check your email/password";
        }
      });
  }
}
