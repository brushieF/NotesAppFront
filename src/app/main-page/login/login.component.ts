import { Component, OnInit, ViewContainerRef, ViewChild} from '@angular/core';
import { Form, NgForm, EmailValidator } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import {ServiceSubscriber} from '../../error-shower/error-subscriber';

import { User } from '../../users/User';
import { ModalServiceService } from '../../modal-service.service';

import { Subscriber } from 'rxjs';
import { SWITCH_COMPILE_INJECTABLE__POST_R3__ } from '@angular/core/src/di/injectable';


@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['../main-page.component.css']
})
export class LoginComponent extends ServiceSubscriber implements OnInit {
  @ViewChild('errorContainer1', {read: ViewContainerRef}) errorContainter;
  LoadingEvent : Subscriber<boolean>;
  isLoading = false;

  constructor(private userService : UserServiceService, private modalSerive : ModalServiceService) {super(modalSerive) }

  ngOnInit() {
    this.loadingSubscribe();
    this.errorsSubscribe();
  }
  loadingSubscribe(){
    this.userService.LoadingEvent.subscribe(e=>{
     if(e) this.isLoading = true;
    
  })};
  errorsSubscribe(){
    this.userService.ErrorEvent.subscribe(e=>{
      this.clearError();
      if(e.isLogin) super.makeErrorModal(e,this.errorContainter);
      
    });
}
clearError(){
  super.destroyErrorModal(this.errorContainter);
}
  
  loginUser(form : NgForm){    
    var pass = form.value.password;
    var email = form.value.email;
    
    this.userService.loginUser(email,pass);
}

}
