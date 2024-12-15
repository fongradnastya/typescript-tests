import { ChessField } from './chessField';
import { ChessMove } from './chessMove';
import { Chessman } from './chessman';

/** Rook chess figure (Ладья). */
export class Rook extends Chessman {

  /**
   * Moves the chess figure to the target position.
   * @param target Chess field to move the chess figure to.
   */
  public goToPosition(target: ChessField): ChessMove | null {
    const currentRow = this.getPosition().getRow();
    const currentCol = this.getPosition().getColumn();
    const targetRow = target.getRow();
    const targetCol = target.getColumn();

    const isStraightMove = currentRow === targetRow || currentCol === targetCol;

    if (isStraightMove && !target.isBusy()) {
      return new ChessMove(this.getPosition(), target, this);
    }
    return null;
  }
}
