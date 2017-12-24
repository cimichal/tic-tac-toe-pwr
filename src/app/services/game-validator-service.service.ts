import { UserType } from './../model/UserType';
import { Injectable } from '@angular/core';
import { SingleCell } from '../model/SingleCell';

@Injectable()
export class GameValidatorService {

  private boardSize : number = 3; 
  private whoWin : UserType;
  
  constructor() { }

  public CheckIfSomeoneWin (matrix : Array<Array<number>>, cellArray : Array<SingleCell>) : boolean{
    if (this.ValidateRows(matrix, cellArray)){
      return true;
    }
    
    return false;
  }

  public GetWinner () : UserType{
    if (this.whoWin === undefined)
    {
      return;
    }

    return this.whoWin;
  }

  private ValidateRows(matrix : Array<Array<number>>, cellArray : Array<SingleCell>) : boolean{
    for (let row = 0; row < matrix.length; row++) {
      let supposeRowContainsWinner = false;
      let userCellCounter : number = 0; 
      let computerCellCounter : number = 0;   

      for (let col = 0; col < matrix.length; col++) {
        const element = matrix[row][col];
        let cell = cellArray[element];

        if (cell.DisplayCharacter === "" || cell.State === undefined || cell.User === undefined)
        {
          continue;
        }
        
        if (cell.User === UserType.User){
          userCellCounter++;
        }

        if (cell.User === UserType.Computer){
          computerCellCounter++;
        }

        if (userCellCounter === this.boardSize)
        {
          this.whoWin = UserType.User;
          return true;
        }

        if (computerCellCounter === this.boardSize){
          this.whoWin = UserType.Computer;
          return true;
        }
      }

      console.log("Row ", row ," -> User cell: ", userCellCounter);
      console.log("Row ", row , "-> Computer cell: ", computerCellCounter);
    } 
    
    return false;
  }
 }

