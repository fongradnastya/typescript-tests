import { ChessField } from './chessField';
import { ChessMove } from './chessMove';
import { Chessman } from './chessman';
import { Queen } from './queen';
import { GameBoard } from './gameBoard';

import { ChessSide } from '../types/chessSide';
import { ChessmanType } from '../types/chessmanType';
import { FIELD_SIZE, START_POSITION } from '../consts';

export class Pawn extends Chessman {
  public goToPosition(
    target: ChessField,
    lastMove: ChessMove | null,
    gameBoard: GameBoard,
  ): ChessMove | null {
    if (!this.isValidTarget(target)) return null;

    const isPromotion = this.isPromotion(target);
    const isEnPassant = this.canCaptureEnPassant(target, lastMove, gameBoard);
    const capturedChessman = isEnPassant
      ? lastMove?.getChessman()
      : gameBoard.getChessmanAt(target) ?? undefined;

    if (this.isForwardMove(target, gameBoard)) {
      // Handle promotion
      if (isPromotion) {
        const queen = new Queen(this.getId(), ChessmanType.Queen, target, this.getSide());
        return new ChessMove(this.getPosition(), target, queen, capturedChessman);
      }
      // Handle forward move
      return new ChessMove(this.getPosition(), target, this);
    }

    // Handle diagonal capture
    if (this.isDiagonalCapture(target, gameBoard)) {
      return new ChessMove(this.getPosition(), target, this, capturedChessman);
    }

    // Handle en passant
    if (isEnPassant) {
      return new ChessMove(this.getPosition(), target, this, capturedChessman);
    }

    return null;
  }

  // --- Helper Methods ---

  private isValidTarget(target: ChessField): boolean {
    const targetRow = target.getRow();
    const targetCol = target.getColumn();
    return targetRow <= FIELD_SIZE && targetCol <= FIELD_SIZE;
  }

  private isForwardMove(target: ChessField, gameBoard: GameBoard): boolean {
    const currentRow = this.getPosition().getRow();
    const currentCol = this.getPosition().getColumn();
    const targetRow = target.getRow();
    const targetCol = target.getColumn();

    const isForward = this.getSide() === ChessSide.White
      ? targetRow > currentRow
      : targetRow < currentRow;

    const isSameColumn = targetCol === currentCol;
    const isSingleStep = Math.abs(targetRow - currentRow) === 1;

    return (
      isForward &&
      isSingleStep &&
      isSameColumn &&
      !gameBoard.isFieldOccupied(target)
    );
  }

  private isDiagonalCapture(target: ChessField, gameBoard: GameBoard): boolean {
    const currentRow = this.getPosition().getRow();
    const currentCol = this.getPosition().getColumn();
    const targetRow = target.getRow();
    const targetCol = target.getColumn();

    const isDiagonal = Math.abs(targetCol - currentCol) === 1;
    const isSingleStep = Math.abs(targetRow - currentRow) === 1;

    const targetOccupied = gameBoard.isFieldOccupied(target);

    return (
      (isSingleStep && targetOccupied && isDiagonal) // Diagonal capture
    );
  }

  private isPromotion(target: ChessField): boolean {
    const targetRow = target.getRow();
    const lastRank = this.getSide() === ChessSide.White ? FIELD_SIZE : START_POSITION;
    return targetRow === lastRank;
  }

  private canCaptureEnPassant(
    target: ChessField,
    lastMove: ChessMove | null,
    gameBoard: GameBoard
  ): boolean {
    if (!lastMove) return false;

    const currentRow = this.getPosition().getRow();
    const currentCol = this.getPosition().getColumn();
    const targetRow = target.getRow();
    const targetCol = target.getColumn();

    const lastChessman = lastMove.getChessman();
    if (!(lastChessman instanceof Pawn)) return false;

    const lastStartRow = lastMove.getStartPosition().getRow();
    const lastEndRow = lastMove.getTargetPosition().getRow();
    const lastCol = lastMove.getTargetPosition().getColumn();

    const isTwoSquareAdvance = Math.abs(lastStartRow - lastEndRow) === 2;
    const isAdjacentColumn = Math.abs(currentCol - lastCol) === 1;
    // For white pawns
    if (this.getSide() === ChessSide.White) {
      return (
        isTwoSquareAdvance &&
        lastEndRow === currentRow &&
        targetRow === currentRow + 1 &&
        targetCol === lastCol &&
        isAdjacentColumn &&
        !gameBoard.isFieldOccupied(target)
      );
    }

    // For black pawns
    if (this.getSide() === ChessSide.Black) {
      return (
        isTwoSquareAdvance &&
        lastEndRow === currentRow &&
        targetRow === currentRow - 1 &&
        targetCol === lastCol &&
        isAdjacentColumn &&
        !gameBoard.isFieldOccupied(target)
      );
    }

    return false;
  }
}