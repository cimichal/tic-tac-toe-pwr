import { CellState } from "./CellState";
import { UserType } from "./UserType";

export class SingleCell
{
    
    private _State : CellState;
    public get State() : CellState {
        return this._State;
    }
    public set State(v : CellState) {
        this._State = v;
    }
    
    
    private _User : UserType;
    public get User() : UserType {
        return this._User;
    }
    public set User(v : UserType) {
        this._User = v;
    }
    
    
    private _DisplayCharacter : string;
    public get DisplayCharacter() : string {
        return this._DisplayCharacter;
    }
    public set DisplayCharacter(v : string) {
        this._DisplayCharacter = v;
    }

    
    private _Index : number;
    public get Index() : number {
        return this._Index;
    }
    public set Index(v : number) {
        this._Index = v;
    }

    
    private _IsWinningCell : boolean;
    public get IsWinningCell() : boolean {
        return this._IsWinningCell;
    }
    public set IsWinningCell(v : boolean) {
        this._IsWinningCell = v;
    }
      
    
}