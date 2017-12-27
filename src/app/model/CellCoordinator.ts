export class CellCoordinator{
    
    constructor (row: number, col: number)
    {
        this._row = row;
        this._col = col;
    }

    private _row : number;
    public get row() : number {
        return this._row;
    }
    public set row(v : number) {
        this._row = v;
    }
    
    
    private _col : number;
    public get col() : number {
        return this._col;
    }
    public set col(v : number) {
        this._col = v;
    }
    
}