import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../users/User';
import { Subscriber } from 'rxjs';
import { Animation} from '../buttonAnim';
import { ModalServiceService } from '../../modal-service.service';
import {ServiceSubscriber} from '../../error-shower/error-subscriber';

@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['../main-page.component.css'],
  animations: [Animation.buttonAnim]
})
export class RegisterComponent extends ServiceSubscriber implements OnInit  {
  @ViewChild('errorContainer', {read: ViewContainerRef}) errorContainter;
  

  LoadingEvent : Subscriber<boolean>;
  isValid: boolean = false;
  loginValid : boolean = false;
  emailValid : boolean = false;
  passwordValid : boolean = false;
  passwordConfirmValid : boolean = false;
  
  isError : boolean = false;

  isLoading : boolean = false;
  password : string;

  constructor(private userService : UserServiceService, modalService : ModalServiceService) { super(modalService)}

  ngOnInit() {
      this.loadingSubscribe();
      this.errorsSubscribe();
  }
  passwordCheck(text : any){
    if(text.password.errors==null) {
      this.passwordValid = true;
      this.password = text.password.value;
      if(text.password.value==text.passwordConfirm.value){
        this.passwordConfirmValid = true;
      }
    }
      else { this.passwordValid = false;
              this.passwordConfirmValid = false;}
    this.checkIfValid();
  }
  passwordConfirm(text){
      if(this.passwordValid && text == this.password) this.passwordConfirmValid = true;
        else this.passwordConfirmValid = false;
       this.checkIfValid();
  }
  loginCheck(text : FormControl){
     if(text.errors==null) this.loginValid = true;
       else { this.loginValid = false;}
      this.checkIfValid();
  }
 
  emailCheck(text : FormControl)
  {
      if(text.errors==null) this.emailValid = true;
        else { this.emailValid = false;}
      this.checkIfValid();
  }
  registerUser(user : User){     
    this.userService.registerUser(user);
    
  }
  errorsSubscribe(){
      this.userService.ErrorEvent.subscribe(e=>{
        if(e===true) e = "Successfully registerd!";    
        if(e.isLogin===false) super.makeErrorModal(e,this.errorContainter);
        
      });
  }
  clearError(){
    super.destroyErrorModal(this.errorContainter);
  }

  loadingSubscribe(){
    this.userService.LoadingEvent.subscribe(e=>{
     if(e) {this.isLoading = true
            this.isValid = false;
      }
       else {this.isLoading = false;         
              this.checkIfValid();}       
        }
    );
  }

  createUser(form : NgForm){
    this.clearError();
    var user = new User();
    user.Email = form.value.email;
    user.Password = form.value.password;
    user.ConfirmPassword = user.Password;

    this.registerUser(user);
    
  }

  checkIfValid(){
    if(this.emailValid && this.passwordValid && this.passwordConfirmValid) this.isValid = true;
      else this.isValid = false;


  }




}
