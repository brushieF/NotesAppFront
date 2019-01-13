import { Injectable } from '@angular/core';
import {User} from 'src/app/users/User';

import {Token} from './services/Token'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser : User;

  constructor(public router : Router) { }
  
  isAuthenticated() : boolean{
      if(this.loggedUser!=undefined) return true;
      return false;
  }
  proceedToNotes(){
      this.router.navigateByUrl("/notes");
  }

  printLoggedUser(){
    console.log("Currently logged: ")
    console.log(this.loggedUser);
    console.log("Token");
    console.log(this.loggedUser.Token);
  }
  
}
