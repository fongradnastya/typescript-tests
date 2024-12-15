import { Chessman } from './chessman';

// Class representing a chessboard field
export class ChessField {
  public constructor(
    private readonly row: number, 
    private readonly column: number, 
    private readonly occupant: Chessman | null = null
  ) {}

  public getRow(): number {
    return this.row;
  }

  public getColumn(): number {
    return this.column;
  }

  public getOccupant(): Chessman | null {
    return this.occupant;
  }

  public isBusy(): boolean {
    return this.occupant != null;
  }

  public asString(): string {
    return `(${this.getRow}:${this.getColumn})`;
  }
}