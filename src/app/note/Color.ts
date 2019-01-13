import { IColor } from './IColor';


export class Color implements IColor{
 
    R: number;
    G: number;
    B: number;

    constructor(){
         this.getRandomColor();
    }
    
    newInstance(){
        let newColor : Color = new Color();
        newColor.R = this.R;
        newColor.B = this.B;
        newColor.G = this.G;
        
        return newColor;
    }

    getRandomColor(){
        let colors : number[] = [];     
        for(let i =0;i<3;i++){           
           colors.push((((Math.random())*50)+150));
        }
        this.assingColors(colors);
       
    } 
    assingColors(colors : number[]){
        this.R = colors[0];
        this.G = colors[1];
        this.B = colors[2];
    }
   
    getMainColor(): string {
        return "rgb("+this.R+","+this.G+","+this.B+")";
    }
    getInvertedColor(): string {
        return "rgb("+(255-this.R)+","+(255-this.G)+","+(255-this.B)+")";

    }
}