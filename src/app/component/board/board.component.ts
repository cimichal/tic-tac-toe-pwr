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

  private boardSize : number = 3; 
  private matrix : Array<Array<number>>;
  private cellArray : Array<SingleCell>;
  private activeUser : UserType; 
  private activeUserName : string;

  constructor(private _gameService: GameValidatorService) {
    this.matrix = new Array<Array<number>>();
    this.cellArray = new Array<SingleCell>();
    this.InitTwoDimensionalMatrix();
   }

  ngOnInit() {
    this.activeUser = UserType.User;
    this.activeUserName = UserType[this.activeUser];
  }

  private CellClicked (cell) : void{
    if (this.cellArray[cell].State === CellState.Active){
      this.cellArray[cell].State = CellState.Deactive;
      this.cellArray[cell].DisplayCharacter = "X";
      this.MoveNext(cell);
    }
  }

  private MoveNext(cell){
    if (this.CheckIfSomeoneWin()){
      return;
    }
    
    if (this.activeUser === UserType.User)
    {
      this.activeUser = UserType.Computer;
      this.cellArray[cell].DisplayCharacter = "Y";
    }else{
      this.activeUser = UserType.User;
      this.cellArray[cell].DisplayCharacter = "X";
    }
    this.activeUserName = UserType[this.activeUser];
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

  private ResetGame() : void{
    for (let cell = 0; cell < this.cellArray.length; cell++) {
      this.cellArray[cell].DisplayCharacter = "";
      this.cellArray[cell].State = CellState.Active;
    }
  }

  private CheckIfSomeoneWin() : boolean{
    return this._gameService.CheckIfSomeoneWin(this.matrix, this.cellArray);
  }
}
