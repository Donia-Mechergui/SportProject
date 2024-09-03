import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 userUrl:string="http://localhost:3000/users"
  constructor(private httpClient:HttpClient) { }
  // user={fn,ln,email,pwd,tel,role}
  // photo
  signUp(user:any,photo:File){
    let formData=new FormData();
    // append("key",value);
    formData.append("firstName",user.firstName);
    formData.append("lastName",user.lastName);
    formData.append("email",user.email);
    formData.append("password",user.password);
    formData.append("role",user.role);
    formData.append("img",photo);
    // si on modifie le path dans le user urlencoded, on doit le changer dans application.js
    // return this.httpClient.post<{msg:string,isAdded:boolean,user:any}>(this.userUrl+"/signup",user);
    return this.httpClient.post<{msg:string,isAdded:boolean,user:any}>(this.userUrl,formData);
  }
   // user={email,pwd}
  login(user:any){
    return this.httpClient.post<{msg:string,user:string}>(this.userUrl+"/login",user);
  }
}
