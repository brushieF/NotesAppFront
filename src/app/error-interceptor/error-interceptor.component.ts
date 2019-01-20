import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class ErrorInterceptorComponent implements HttpInterceptor {

  constructor() { }

   
  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    return next.handle(request).pipe(catchError(e => {
      if(e.status === 400){
          console.log("Unathorized");
      }
      else if(e.status ===401){

      }
      else if(e.status === 0){
          
          e.statusText = "Connection timed out"
      }  
      var error = e.error.ModelState || e.error.error_description || e.statusText;
   
      if(typeof(error)==="object") error = Object.values(error);
      if(typeof(error)==="string") error = Array.of(error);
      return throwError(error);
    }))
  }
}
