import { CellState } from './../model/CellState';
import { SingleCell } from './../model/SingleCell';
import { UserType } from './../model/UserType';
import { Injectable } from '@angular/core';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class GameValidatorService {

  private boardSize : number; 
  private whoWin : UserType;
  
  constructor(private _globalData: GlobalDataService) { 
    this.boardSize = this._globalData.GetBoardSize();
  }

  public UpdateBoardSize (){
    this.boardSize = this._globalData.GetBoardSize();
  }

  public CheckIfSomeoneWin (matrix : Array<Array<number>>, cellArray : Array<SingleCell>) : boolean{
    if (this.ValidateRows(matrix, cellArray)){
      return true;
    }
    
    if (this.ValidateColumns(matrix, cellArray)){
      return true;
    }

    if (this.ValidateLeftDiagonals(matrix, cellArray)){
      return true;
    }

    if (this.ValidateRightDiagonals(matrix, cellArray)){
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
          console.log(UserType[userTypeOfPreviouseColumnCell]);
          return true;
        }
      }
    }
    return false;
  }

  private ValidateRightDiagonals(matrix : Array<Array<number>>, cellArray : Array<SingleCell>) : boolean{
    let rightDiagonalRow : number = 0;
    let rightDiagonalCol : number = this._globalData.GetBoardSize();
    let rightDiagonalCell : SingleCell;
    var columnCounterDiagonalRight: number = 0;
    var userTypeOfPreviouseColumnCellDiagonalRight : UserType;
    
    for (let row = 0; row < this._globalData.GetBoardSize(); row++) {
 
      rightDiagonalRow = row;
      rightDiagonalCol = this.boardSize - 1 - row;

      rightDiagonalCell = cellArray[matrix[rightDiagonalRow][rightDiagonalCol]];

      if (rightDiagonalCell.DisplayCharacter === "" || rightDiagonalCell.State === undefined || rightDiagonalCell.User === undefined)
      {
        return false;
      }

      if (rightDiagonalCell.Index === matrix[0][this.boardSize-1] && rightDiagonalCell.State === CellState.Deactive)
      {
        columnCounterDiagonalRight++;
        userTypeOfPreviouseColumnCellDiagonalRight = rightDiagonalCell.User;
        continue;
      }

      if (rightDiagonalCell.User === userTypeOfPreviouseColumnCellDiagonalRight){
        columnCounterDiagonalRight++;
      }

      if (columnCounterDiagonalRight === this.boardSize){
        this.whoWin = userTypeOfPreviouseColumnCellDiagonalRight;
        return true;
      }
    }
    
    return false;
  }

  private ValidateLeftDiagonals(matrix : Array<Array<number>>, cellArray : Array<SingleCell>) : boolean{
      let leftDiagonalRow : number = 0;
      let leftDiagonalCol : number = 0;
      let leftDiagonalCell : SingleCell;
      var columnCounterDiagonalLeft: number = 0;
      var userTypeOfPreviouseColumnCellDiagonalLeft : UserType;

    for (let row = 0; row < this._globalData.GetBoardSize(); row++) {
      leftDiagonalRow = row;
      leftDiagonalCol = row;

      leftDiagonalCell = cellArray[matrix[leftDiagonalRow][leftDiagonalCol]];

      if (leftDiagonalCell.DisplayCharacter === "" || leftDiagonalCell.State === undefined || leftDiagonalCell.User === undefined)
      {
        return false;
      }

      if (leftDiagonalCell.Index === matrix[0][0] && leftDiagonalCell.State === CellState.Deactive)
      {

        columnCounterDiagonalLeft++;
        userTypeOfPreviouseColumnCellDiagonalLeft = leftDiagonalCell.User;
        continue;
      }

      if (leftDiagonalCell.User === userTypeOfPreviouseColumnCellDiagonalLeft){
        columnCounterDiagonalLeft++;
      }

      if (columnCounterDiagonalLeft === this.boardSize){
        this.whoWin = userTypeOfPreviouseColumnCellDiagonalLeft;
        return true;
      }
    }
    
    return false;
  }
 }

