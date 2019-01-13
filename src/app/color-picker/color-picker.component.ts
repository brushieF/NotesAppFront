import { Component, OnInit, ViewChild,QueryList } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  @ViewChild("hue") canvas : QueryList<any>;

  
  pickerPosX : number = 0;
  pickerPosY : number;
  
  private _mouseDown : boolean = false;;


  constructor() { }

  ngOnInit() {



  //  this.canvasTest();
  //  this.drawRgb(10);
  }
  drawRgb(hue : number){
    var c : any = document.getElementById("canv");
    var hue = 100;
    var ctx = c.getContext("2d");
    
   
    for(var i=200;i<=300;i++){
      for(var j=0;j<360;j++){
        ctx.beginPath();
        ctx.arc(180,180,i/2,j*(Math.PI/180),(j+1)*(Math.PI/180)),
        ctx.strokeStyle= "hsl("+j+",100%,50%)";      
        ctx.stroke();
        ctx.closePath();
    }
    }
  }
  mouseDown(){
    this._mouseDown = true;
  }
  mouseUp(){
    this._mouseDown = false;
  }

  log(e : MouseEvent){
    if(this._mouseDown){
    this.calculateRadians(e);
    
    this.pickerPosX = e.clientX - 10;
    this.pickerPosY = e.clientY + 8;
    console.log(e);

  }
  }

  calculateRadians(e : MouseEvent){
      var offsetX = (e.offsetX - 180);
      var offsetY = (e.offsetY - 180) * -1;
      console.log(offsetX + " offsetX");
      console.log(offsetY + " offsetY");
      console.log(Math.atan2(offsetX,offsetY));
    }

  canvasTest(){
    var c : any = document.getElementById("hue");
    console.log(c);

    var ctx = c.getContext("2d");
    for(var i=0;i<=360;i++){
    
      ctx.strokeStyle= "hsl(0,0%,"+(i*100)/360+"%)";
     
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,50);
      ctx.stroke();
      ctx.closePath();

      ctx.fill();
    }



  }

}


