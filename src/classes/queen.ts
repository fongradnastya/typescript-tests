import { ChessField } from './chessField';
import { ChessMove } from './chessMove';
import { Chessman } from './chessman';
import { GameBoard } from './gameBoard';

import { FIELD_SIZE } from '../consts';

export class Queen extends Chessman {
  /**
   * Moves the chess figure to the target position.
   * @param target Chess field to move the chess figure to.
   * @param gameBoard Game field to check if the move is valid.
   */
  public goToPosition(
    target: ChessField,
    _lastMove: ChessMove,
    gameBoard: GameBoard
  ): ChessMove | null {
    const currentRow = this.getPosition().getRow();
    const currentCol = this.getPosition().getColumn();
    const targetRow = target.getRow();
    const targetCol = target.getColumn();

    // Validate board boundaries
    if (targetRow > FIELD_SIZE || targetCol > FIELD_SIZE) {
      return null;
    }

    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol - currentCol);

    const isHorizontalMove = currentRow === targetRow && currentCol !== targetCol;
    const isVerticalMove = currentCol === targetCol && currentRow !== targetRow;
    const isDiagonalMove = rowDiff === colDiff;

    if(!isHorizontalMove && !isDiagonalMove && !isVerticalMove) {
      return null;
    }

    // Ensure the path to the target is clear
    if (this.isPathBlocked(currentRow, currentCol, targetRow, targetCol, gameBoard)) {
      return null;
    }

    // Determine if the target contains an opponent piece
    const targetChessman = gameBoard.getChessmanAt(target);

    if (targetChessman && targetChessman.getSide() !== this.getSide()) {
      // Valid capture
      return new ChessMove(this.getPosition(), target, this, targetChessman);
    }

    if (targetChessman === null) {
      // Valid move to an empty field
      return new ChessMove(this.getPosition(), target, this);
    }

    return null;
  }

  /**
   * Checks if the path from the current position to the target position is blocked.
   * @param currentRow Current row of the Queen.
   * @param currentCol Current column of the Queen.
   * @param targetRow Target row of the move.
   * @param targetCol Target column of the move.
   * @param gameBoard Game field to check for obstacles.
   */
  private isPathBlocked(
    currentRow: number,
    currentCol: number,
    targetRow: number,
    targetCol: number,
    gameBoard: GameBoard
  ): boolean {
    const rowStep = targetRow > currentRow ? 1 : targetRow < currentRow ? -1 : 0;
    const colStep = targetCol > currentCol ? 1 : targetCol < currentCol ? -1 : 0;

    let row = currentRow + rowStep;
    let col = currentCol + colStep;

    // Check all fields on the path to the target
    while (row !== targetRow || col !== targetCol) {
      const intermediateField = new ChessField(row, col);
      if (gameBoard.isFieldOccupied(intermediateField)) {
        return true;
      }

      row += rowStep;
      col += colStep;
    }

    return false;
  }
}