import { CellCoordinator } from './../../model/CellCoordinator';
import { GlobalDataService } from './../../services/global-data.service';
import { GameValidatorService } from './../../services/game-validator-service.service';
import { UserType } from './../../model/UserType';
import { CellState } from './../../model/CellState';
import { SingleCell } from './../../model/SingleCell';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  private boardSize : number; 
  private matrix : Array<Array<number>>;
  private cellArray : Array<SingleCell>;
  private activeUser : UserType; 
  private activeUserName : string;
  private winner : UserType;
  private activeGame : boolean;

  constructor(private _gameService: GameValidatorService, private _globalData: GlobalDataService) {
    this.boardSize = this._globalData.GetBoardSize();
    this.matrix = new Array<Array<number>>();
    this.cellArray = new Array<SingleCell>();
    this.InitTwoDimensionalMatrix();
   }

  ngOnInit() {
    this.activeUser = UserType.User;
    this.activeUserName = UserType[this.activeUser];
    this.activeGame = true;
  }

  private CellClicked (cell) : void{
    if (this.cellArray[cell].State === CellState.Active && this.activeGame === true){
      this.cellArray[cell].State = CellState.Deactive;
      this.cellArray[cell].DisplayCharacter = "X";
      this.cellArray[cell].User = this.activeUser;
      this.MoveNext(cell);
    }
  }

  private MoveNext(cell){
    if (this.activeUser === UserType.User)
    {
      this.activeUser = UserType.Computer;
      this.cellArray[cell].DisplayCharacter = "Y";
      this.PredicatedComputerMove(cell);
    }else{
      this.activeUser = UserType.User;
      this.cellArray[cell].DisplayCharacter = "X";
    }
    this.activeUserName = UserType[this.activeUser];

    if (this.CheckIfSomeoneWin()){
      this.DisplayWinnerInforation();
      return;
    }
  }
  
  private PredicatedComputerMove(currentCellIndex : number) : void{
    let currentCellXY = this.GetCoordinateOfCurrentCell(currentCellIndex);
  }

  private GetCoordinateOfCurrentCell(currentCellIndex : number) : CellCoordinator
  { 
    let currentCellCoordinate = new Array<Array<number>>();

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const element = this.matrix[row][col];
        if (element === currentCellIndex){
          let cellCord = new CellCoordinator(row, col);
          return cellCord;
        } 
      }      
    }

    return new CellCoordinator(0,0);
  }

  private InitTwoDimensionalMatrix () : void 
  {
     for (let row = 0; row < this.boardSize; row++) {
       this.matrix[row] = [];
       for (let col = 0; col < this.boardSize; col++) {
         let index = col + row * this.boardSize;
         this.matrix[row][col] = index;
         this.cellArray[index] = new SingleCell();
         this.cellArray[index].Index = index;
         this.cellArray[index].State = CellState.Active
       }
     }

     console.log(this.matrix);
     console.log(this.cellArray);   
  }

  private NewGame() : void {
    this.ResetGame();
    this.matrix = new Array<Array<number>>();
    this.cellArray = new Array<SingleCell>();
    this.InitTwoDimensionalMatrix();
    this._globalData.UpdateBoardSize(this.boardSize);
    this._gameService.UpdateBoardSize();
    this.activeGame = true;
  }

  private ResetGame() : void{
    for (let cell = 0; cell < this.cellArray.length; cell++) {
      this.cellArray[cell].DisplayCharacter = "";
      this.cellArray[cell].State = CellState.Active;
    }
    console.clear();
    this.activeGame = false;
    this.winner = undefined;
  }

  private CheckIfSomeoneWin() : boolean{
    return this._gameService.CheckIfSomeoneWin(this.matrix, this.cellArray);
  }

  private DisplayWinnerInforation() {
    this.winner = this._gameService.GetWinner();
    this.activeGame = false;
    console.log("Winner: ", UserType[this.winner]);
  }

  private UserTypeKeys(): Array<string>{
    let array = new Array<string>();
    let keys = Object.keys(UserType);

    for (let item = 0; item < keys.length; item++) {
      const element = keys[item];
      array.push(element);
    }

    return array.slice(array.length / 2, array.length);
  }

  private GetWinnerName(): string {
    if(this.winner !== undefined){
      return UserType[this.winner];
    }

    return "";
  }
}
