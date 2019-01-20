import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../users/User';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  User : User;
  isLogged : boolean;

  constructor(private authService : AuthService, private userService : UserServiceService) { }

  ngOnInit() {
    this.authService.Logged.subscribe(e=>this.userLogged());
  }

  addNote(){
    this.userService.NewNoteEvent.next(true);
  }

  logOut(){
    this.authService.logOut();
    this.isLogged = false;
  }
  userLogged(){
      this.User = this.authService.loggedUser;
      this.isLogged = true;
  }

}
