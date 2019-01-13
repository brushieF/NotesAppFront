import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import {NoteComponent} from './note/note.component';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
  {path: '',component: MainPageComponent},
  {
    path: 'notes', component: NoteComponent, canActivate:[AuthGuardService]
  },
  {path: '*', component: MainPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
