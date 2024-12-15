import { ChessField } from "./chessField";
import { ChessMove } from "./chessMove";
import { Chessman } from "./chessman";

import { FIELD_SIZE } from "../consts";

export class Queen extends Chessman {
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

    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol - currentCol);

    const isHorizontalMove = currentRow === targetRow && currentCol !== targetCol;
    const isVerticalMove = currentCol === targetCol && currentRow !== targetRow;
    const isDiagonalMove = rowDiff === colDiff;


    if ((isHorizontalMove || isVerticalMove || isDiagonalMove) && !target.isBusy()) {
      return new ChessMove(this.getPosition(), target, this, moveNumber + 1);
    }

    return null;
  }
}