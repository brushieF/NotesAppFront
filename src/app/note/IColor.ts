export interface IColor{
    R : number;
    G : number;
    B : number;

    getMainColor() : string;
    getInvertedColor() : string;    
    getRandomColor();
    newInstance();
}