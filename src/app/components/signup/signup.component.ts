import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  photo:any;
  signupForm !: FormGroup;
  user:any;
  path!:string;
  errorMsg:string='';
  constructor(private formBuilder:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.path=this.router.url;
    console.log("here path",this.path);
    // this.signupForm  : id de la formulaire , ce n'est pas l'object, on doit utiliser .value pour voir les valeurs de la formulaire
   this.signupForm = this.formBuilder.group({firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      confirmPassword:[''],
      phoneNumber:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      address:['',[Validators.required,Validators.minLength(3)]],})

  }
  // signup(){
  //   alert("signup clicked");
  //   console.log("this.signupForm",this.signupForm.value);
    
  // }
signUp(){
  if(this.path=='/signupadmin'){
    // on a ajoute un attribut role au formulaire
    this.signupForm.value.role="admin"
  }
  else{
       this.signupForm.value.role="client"
  }
  console.log(this.signupForm.value)
  this.userService.signUp(this.signupForm.value,this.photo).subscribe((response)=>{
    console.log("here is the new user",response);
    // this.user=response.user;
  if (response.isAdded){
    // navigate to login
    this.router.navigate(['signin']);
  }
  else{
    // display error message
   this.errorMsg=response.msg;
  }
  })

}
selectFile(event:any){
const inputElement = event.target as HTMLInputElement;
if (inputElement && inputElement.files && inputElement.files.length
> 0) {
this.photo = inputElement.files[0];
console.log("fichier",this.photo);
}
}
}
