import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../users/User'
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { Token } from './Token';
import { Note } from '../note/Note';

import { API } from './/ApiCalls'


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

      this.http.post(API.Token,this.loginDataFormatter(email, password),this.URLEncodedHeader()).subscribe((e : any)=>{
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
      this.http.post(API.RegisterUser,user.stringify(),this.JSONHeader()).subscribe(e=>{
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

  loadNotes() : Observable<any>{
   return this.http.get(API.Notes,this.JSONHeader()); 
  }
  sendNote(note : Note){
    console.log(note.serialize())
    this.http.post(API.Notes,note.serialize(),this.JSONHeader()).subscribe(e=>console.log("Successful Send"),e=>console.log("Send not successful!"));
  }
  updateNote(note : Note){
      this.http.put(API.Notes+"/"+note.NoteID,note.serialize(),this.JSONHeader()).subscribe(e=>console.log("Successful Update"),e=>console.log("Update not successful!"));
  }

  deleteNote(noteID : number){
      this.http.delete(API.Notes+"/"+noteID,this.JSONHeader()).subscribe(e=>console.log("Successful delete!"),e=>console.log("Deleting not successful!"));
  }


}
