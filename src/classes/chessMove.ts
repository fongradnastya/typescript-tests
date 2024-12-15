import { ChessField } from './chessField';
import { Chessman } from './chessman';

export class ChessMove {
  public constructor(
    private from: ChessField, 
    private to: ChessField, 
    private piece: Chessman
  ) {}

  public asString(): string {
    return `${this.piece.getType()} moves from ${this.from.getRow()}${this.from.getColumn()} to ${this.to.getRow()}${this.to.getColumn()}`;
  }
}