import { CellState } from "./CellState";

export class SingleCell
{
    
    private _State : CellState;
    public get State() : CellState {
        return this._State;
    }
    public set State(v : CellState) {
        this._State = v;
    }
    
    
    private _User : string;
    public get User() : string {
        return this._User;
    }
    public set User(v : string) {
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
    
    
}