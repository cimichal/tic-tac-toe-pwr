import { Injectable } from '@angular/core';

@Injectable()
export class GlobalDataService {

  private boardSize : number; 
  constructor() {
    this.boardSize  = 3;
   }

   public GetBoardSize(){
     if (this.boardSize === undefined)
     {
       return 3; 
     }

     return this.boardSize;
   };
}
