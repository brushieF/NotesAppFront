import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { User } from '../users/User'
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { Token } from './Token';






const API_TOKEN = "http://localhost:52574/Token";
const API_REGISTER_USER = "http://localhost:52574/api/Account/Register";

const API_VALUE = "http://localhost:52574/api/Values"


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
 LoadingEvent : Subject<any> = new Subject();
 ErrorEvent : Subject<any> = new Subject();
  constructor(private http : HttpClient, private authService : AuthService) { 


  }

  JSONHeader() : any{
    var header = new HttpHeaders({'Content-Type' : 'application/json'});
   
    var options = { headers: header};
    return options;
  }
  URLEncodedHeader() : any{
    var header = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded'});
   
    var options = { headers: header};
    return options;
  }
  
  loginDataFormatter(email : string, password : string){
        return "grant_type=password&username="+email+"&password="+password;
  }

  loginUser(email : string, password : string){
    this.LoadingEvent.next(true); 

      this.http.post(API_TOKEN,this.loginDataFormatter(email, password),this.URLEncodedHeader()).subscribe((e : any)=>{
        
        this.LoadingEvent.next(false);
        this.ErrorEvent.next(true);
        
        this.authService.loggedUser = new User();
        this.authService.loggedUser.Email = email;
        this.authService.loggedUser.Token = new Token(e.access_token);
        this.authService.proceedToNotes();
        this.authService.printLoggedUser();
        return e;
      },err=>{
         this.LoadingEvent.next(false);
         err.isLogin = true;
        this.ErrorEvent.next(err);
      });
  }


  registerUser(user : User){
    
    this.LoadingEvent.next(true); 
    console.log(this.LoadingEvent);
      this.http.post(API_REGISTER_USER,user.stringify(),this.JSONHeader()).subscribe(e=>{
        this.LoadingEvent.next(false);
        this.ErrorEvent.next(true)
        return e;
      },err=>{ 
        this.LoadingEvent.next(false);
        err.isLogin = false;
        this.ErrorEvent.next(err);
      }
      );
  }

  testAPI(){
      this.http.get(API_VALUE,this.JSONHeader()).subscribe(e=>{
        console.log("TESTAPI");
        console.log(e);
      },err=>{
        console.log("FAIL");
        console.log(err);
      })
  }




}
