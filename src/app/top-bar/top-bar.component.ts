import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../users/User';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  User : User;
  isLogged : boolean;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.Logged.subscribe(e=>this.userLogged());
  }

  userLogged(){
      this.User = this.authService.loggedUser;
      this.isLogged = true;
  }

}
