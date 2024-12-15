import { Chessman } from './chessman';

// Class representing a chessboard field
export class ChessField {
  public constructor(
    private row: number, 
    private column: number, 
    private occupant: Chessman | null = null
  ) {}

  public getRow(): number {
    return this.row;
  }

  public getColumn(): number {
    return this.column;
  }

  public isBusy(): Chessman | null {
    return this.occupant;
  }

  public setOccupant(piece: Chessman | null): void {
    this.occupant = piece;
  }

  public asString(): string {
    return `(${this.getRow}:${this.getColumn})`;
  }
}