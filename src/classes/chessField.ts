import { Chessman } from './chessman';

// Class representing a chessboard field
export class ChessField {
  public constructor(
    private row: string, 
    private column: string, 
    private occupant: Chessman | null = null
  ) {}

  public getRow(): string {
    return this.row;
  }

  public getColumn(): string {
    return this.column;
  }

  public isBusy(): Chessman | null {
    return this.occupant;
  }

  public setOccupant(piece: Chessman | null): void {
    this.occupant = piece;
  }
}