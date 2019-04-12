import { Component, OnInit } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  
  totalColor : string[] = ['red','blue','green','yellow','aqua','purple'];
  // read
  inputRowBallCount:number=4;
  totalInputRowCount :number=10;
  secretCode : number[] =[0,2,1,4]; 

  // index numbers system is followed
  ActiveRow=this.totalInputRowCount-1;
  ActiveRowValues : number[]= [null,null,null,null] ;

  inputRowColorCountArray : any;
  totalInputRowCountArray :any;


  constructor() { 

    this.secretCode[3]=Math.floor(Math.random()*(5-3+1)+3);

    this.inputRowColorCountArray = Array(this.inputRowBallCount).fill(0).map((x,i)=>i);
    this.totalInputRowCountArray = Array(this.totalInputRowCount).fill(0).map((x,i)=>i);
  }

  generateRandomNumber(){
    
  }

  ngOnInit() {
  }

  changeActiveColor(colorIndex)
  {
     // row = this.ActiveRow ;
     // column = this.ActiveRowValues.indexOf(null) ;

     if(this.ActiveRowValues.indexOf(null)!=-1)
    {
     const el: HTMLElement = document.getElementById('row '+this.ActiveRow+' inputColorNumber '+this.ActiveRowValues.indexOf(null));
     this.checkStyleChange(el,this.totalColor[colorIndex],'#555',1,this.ActiveRowValues.indexOf(null),colorIndex);
    }

    this.checkFindImageVisiblity();
  }

  inputRowClicked(rowNumber,inputRowColorNumber,inputDot){

    // remove previous color if any color is there
    if(this.ActiveRow==rowNumber && this.ActiveRowValues[inputRowColorNumber]!=null)
      this.checkStyleChange(inputDot,'rgba(104, 101, 101, 0.651)','#000',0.5,inputRowColorNumber,null);

    this.checkFindImageVisiblity();
  }

  checkStyleChange(htmlElement,color,shadedColor,opacity,inputRowColorNumber,activeRowValue)
  {
    htmlElement.style.background= 'radial-gradient(circle at 15px 15px,'+color +' ,'+shadedColor+')';
    htmlElement.style.opacity=opacity;

    if(inputRowColorNumber != null)
    this.ActiveRowValues[inputRowColorNumber]=activeRowValue;
  }

  checkFindImageVisiblity(){
    const el: HTMLElement = document.getElementById('findImage '+this.ActiveRow);
    
    if(this.ActiveRowValues.indexOf(null)==-1)
      el.style.display='inline';
    
    else
    el.style.display='none';
    
  }

  findButtonClicked()
  {
    console.log("s");

    console.log(this.ActiveRowValues);
    let commanColors = this.ActiveRowValues.filter(o => this.secretCode.some((value) => o==value));
    console.log(commanColors);
    console.log(this.ActiveRowValues);
    let blackCount:number=0,whiteCount:number=0;

    for(let i=0;i<commanColors.length;i++){
      if(this.ActiveRowValues.indexOf(commanColors[i]) == this.secretCode.indexOf(commanColors[i])){ 
        const el: HTMLElement = document.getElementById('row '+this.ActiveRow+' hintDot '+whiteCount);
        this.checkStyleChange(el,'white','#FFF',1,null,null);
        whiteCount++;
      }
      else{
        const el: HTMLElement = document.getElementById('row '+this.ActiveRow+' hintDot '+(this.inputRowBallCount-blackCount-1));
        this.checkStyleChange(el,'black','#000',1,null,null);
        blackCount++;
      }
    }

    this.ActiveRowValues=[null,null,null,null];
    const el: HTMLElement = document.getElementById('findImage '+this.ActiveRow);
    el.style.display='none';
    this.ActiveRow--;

    if(whiteCount==4)
    {
      alert("YEPPIIEE YOU WON!!");
    }
  
  }




}
