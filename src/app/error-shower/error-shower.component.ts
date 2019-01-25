import { Component, OnInit } from '@angular/core';

import { Animation } from '../main-page/buttonAnim';

@Component({
  selector: 'app-error-shower',
  templateUrl: './error-shower.component.html',
  styleUrls: ['./error-shower.component.css'],
  animations: [Animation.hideAnim] 
})
export class ErrorShowerComponent implements OnInit {
  

  shallHide : boolean = false;
  errorContent : string[];

  ngOnInit(): void {
    this.shallHide = true;
  }
  
  ngAfterViewInit(): void {
   
 
   
  }


}
