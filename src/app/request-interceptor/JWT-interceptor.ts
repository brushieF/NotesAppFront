import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable()

export class JWTInterceptor implements HttpInterceptor {
    
    constructor(private authService : AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
        console.log(this.authService.loggedUser);
        var user = this.authService.loggedUser;
        if(this.authService.loggedUser!=undefined){
            console.log("Added Token!");
        request = request.clone({
            setHeaders: { 
                Authorization: 'Bearer ' + user.Token.AccessToken
            }
        })
    }
        console.log("REQUEST");
        console.log(request);
      

        return next.handle(request);
    }


}