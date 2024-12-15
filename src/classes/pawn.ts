import { ChessField } from "./chessField";
import { ChessMove } from "./chessMove";
import { Chessman } from "./chessman";
import { ChessSide } from "../types/chessSide";
import { Queen } from "./queen";

import { ChessmanType } from "../types/chessmanType";
import { FIELD_SIZE, START_POSITION } from "../consts";

/** Pawn chess figure (Пешка). */
export class Pawn extends Chessman {

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

    if (targetRow > FIELD_SIZE || targetCol > FIELD_SIZE || target.isBusy()) {
      return null;
    }

    const isForwardMove =
      this.getSide() === ChessSide.White
        ? targetRow > currentRow
        : targetRow < currentRow;

    if (! isForwardMove) {
      return null;
    }

    const isSameColumn = targetCol === currentCol;

    if (!isSameColumn) {
      return null;
    }

    const isSingleStep = Math.abs(targetRow - currentRow) === 1;
    const isDoubleStep = Math.abs(targetRow - currentRow) === 2;
    const isFirstMove = moveNumber === 1;

    if((isFirstMove && isDoubleStep) || isSingleStep) {
      const lastRank = this.getSide() === ChessSide.White ? FIELD_SIZE : START_POSITION;
      if (targetRow === lastRank) {
        const queen = new Queen(ChessmanType.Queen, target, this.getSide());
        return new ChessMove(this.getPosition(), target, queen, moveNumber + 1);
      }
      return new ChessMove(this.getPosition(), target, this, moveNumber + 1);
    }
    return null;
  }
}