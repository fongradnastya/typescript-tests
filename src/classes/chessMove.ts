import { ChessField } from './chessField';
import { Chessman } from './chessman';

export class ChessMove {
  public constructor(
    private from: ChessField, 
    private to: ChessField, 
    private piece: Chessman,
    private moveNumber: number,
  ) {}

  public asString(): string {
    const move = `Move of the ${this.piece.getSide} number ${this.moveNumber}\n`
    return `${move} ${this.piece.getType()} moves from ${this.from.asString} to ${this.to.asString}`;
  }
}