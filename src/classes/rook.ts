import { ChessField } from './chessField';
import { ChessMove } from './chessMove';
import { Chessman } from './chessman';

import { FIELD_SIZE } from '../consts';

/** Rook chess figure (Ладья). */
export class Rook extends Chessman {

  /**
   * Moves the chess figure to the target position.
   * @param target Chess field to move the chess figure to.
   */
  public goToPosition(
    target: ChessField,
    moveNumber: number,
  ): ChessMove | null {
    const currentRow = this.getPosition().getRow();
    const currentCol = this.getPosition().getColumn();
    const targetRow = target.getRow();
    const targetCol = target.getColumn();

    if (targetRow > FIELD_SIZE || targetCol > FIELD_SIZE) {
      return null;
    }

    const isStraightMove = currentRow === targetRow || currentCol === targetCol;

    if (isStraightMove && !target.isBusy()) {
      return new ChessMove(this.getPosition(), target, this, moveNumber + 1);
    }
    return null;
  }
}
