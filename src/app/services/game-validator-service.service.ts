import { Injectable } from '@angular/core';
import { SingleCell } from '../model/SingleCell';

@Injectable()
export class GameValidatorService {

  private boardSize : number = 3; 
  constructor() { }

  public CheckIfSomeoneWin (matrix : Array<Array<number>>, cellArray : Array<SingleCell>) : boolean{
    if (this.ValidateRows(matrix, cellArray)){
      return true;
    }
    
    return false;
  }

  private ValidateRows(matrix : Array<Array<number>>, cellArray : Array<SingleCell>){
    for (let row = 0; row < matrix.length; row++) {
      if (true){

      }
    }    
  }
 }

