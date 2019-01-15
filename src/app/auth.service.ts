import { Injectable } from '@angular/core';
import {User} from 'src/app/users/User';

import {Token} from './services/Token'
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Logged : Subject<boolean> = new Subject();
  
  loggedUser : User;

  constructor(public router : Router) { }
  
  isAuthenticated() : boolean{
      if(this.loggedUser!=undefined) return true;
      return false;
  }
  proceedToNotes(){
      this.Logged.next(true);
      this.router.navigateByUrl("/notes");
  }

  printLoggedUser(){
    console.log("Currently logged: ")
    console.log(this.loggedUser);
    console.log("Token");
    console.log(this.loggedUser.Token);
  }
  
}
