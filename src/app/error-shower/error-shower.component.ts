import { Component } from '@angular/core';

import { Animation } from '../main-page/buttonAnim';

@Component({
  selector: 'app-error-shower',
  templateUrl: './error-shower.component.html',
  styleUrls: ['./error-shower.component.css'],
  animations: [Animation.hideAnim] 
})
export class ErrorShowerComponent {

  shallHide : boolean = false;
  errorContent : string[];

 
  ngAfterViewInit(): void {
    this.shallHide = true;
 
   
  }


}
