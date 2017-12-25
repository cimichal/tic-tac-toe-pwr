import { UserType } from './../model/UserType';
import { Injectable } from '@angular/core';
import { SingleCell } from '../model/SingleCell';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class GameValidatorService {

  private boardSize : number; 
  private whoWin : UserType;
  
  constructor(private _globalData: GlobalDataService) { 
    this.boardSize = this._globalData.GetBoardSize();
  }

  public CheckIfSomeoneWin (matrix : Array<Array<number>>, cellArray : Array<SingleCell>) : boolean{
    if (this.ValidateRows(matrix, cellArray)){
      return true;
    }
    
    if (this.ValidateColumns(matrix, cellArray)){
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
      // console.log("Row ", row ," -> User cell: ", userCellCounter);
      // console.log("Row ", row , "-> Computer cell: ", computerCellCounter);
    } 
    
    return false;
  }

  private ValidateColumns(matrix : Array<Array<number>>, cellArray : Array<SingleCell>) : boolean{
    
    for (let col = 0; col < this._globalData.GetBoardSize(); col++) {
      var column = col;
      var columnCounter: number = 0;
      var userTypeOfPreviouseColumnCell : UserType;

      for (let row = 0; row < matrix.length; row++) {
        let cell = cellArray[matrix[row][col]];
        
        if (cell.DisplayCharacter === "" || cell.State === undefined || cell.User === undefined)
        {
          continue;
        }

        if (row !== 0 && columnCounter === 0){
          continue; // brak pierwszego zaznaczego elementu
        }

        if (columnCounter === 0){
          columnCounter++; // dodaj pierwszy element
          userTypeOfPreviouseColumnCell = cell.User;
        }else{
          if (cell.User === userTypeOfPreviouseColumnCell){
            columnCounter++;
          }
        }

        if (columnCounter === this.boardSize){
          this.whoWin = userTypeOfPreviouseColumnCell;
          return true;
        }
      }
    }
    return false;
  }
 }

