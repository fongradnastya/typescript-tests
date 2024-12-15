import { ChessField } from "./chessField";
import { ChessMove } from "./chessMove";
import { Chessman } from "./chessman";
import { ChessSide } from "../types/chessSide";

/** Pawn chess figure (Пешка). */
export class Pawn extends Chessman {

  /**
   * Moves the chess figure to the target position.
   * @param target Chess field to move the chess figure to.
   */
  public goToPosition(target: ChessField): ChessMove | null {
    const currentRow = this.getPosition().getRow();
    const currentCol = this.getPosition().getColumn();
    const targetRow = target.getRow();
    const targetCol = target.getColumn();

    const isForwardMove =
      this.getSide() === ChessSide.White
        ? targetRow > currentRow
        : targetRow < currentRow;

    const isSingleStep = Math.abs(parseInt(targetRow) - parseInt(currentRow)) === 1;
    const isSameColumn = targetCol === currentCol;

    if (isForwardMove && isSingleStep && isSameColumn && !target.isBusy()) {
      return new ChessMove(this.getPosition(), target, this);
    }
    return null;
  }
}