import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NoteComponent } from './note/note.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ModalServiceService } from './modal-service.service';
import { RegisterComponent } from './main-page/register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './main-page/login/login.component';
import { UserServiceService } from './services/user-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ErrorInterceptorComponent } from './error-interceptor/error-interceptor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorShowerComponent } from './error-shower/error-shower.component';
import { JWTInterceptor } from './request-interceptor/JWT-interceptor';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth.service';



@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    NoteComponent,
    EditMenuComponent,
    ColorPickerComponent,
    RegisterComponent,
    MainPageComponent,
    LoginComponent,
    ErrorShowerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ModalServiceService,
              UserServiceService,
              AuthGuardService,
              AuthService,
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorComponent, multi: true },
            {  provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents:[
    ColorPickerComponent,
    EditMenuComponent,
    ErrorShowerComponent
  ]
})
export class AppModule { }
