import { ChessField } from './chessField';
import { Chessman } from './chessman';

export class ChessMove {
  public constructor(
    private readonly from: ChessField, 
    private readonly to: ChessField, 
    private readonly piece: Chessman,
    private readonly capturedPiece?: Chessman,
  ) {}

  public asString(): string {
    const moveName = `Move of the ${this.piece.asString()}\n`;
    const moveDirection = `moves from ${this.from.asString()} to ${this.to.asString()}\n`;
    const moveTarget = this.capturedPiece ? `captures ${this.capturedPiece.asString()}\n` : '';
    return moveName + moveDirection + moveTarget;
  }

  public getChessman(): Chessman {
    return this.piece;
  }

  public getStartPosition(): ChessField {
    return this.from;
  }

  public getTargetPosition(): ChessField {
    return this.to;
  }
}