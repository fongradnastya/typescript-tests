import { ChessField } from '../classes/chessField';
import { ChessMove } from '../classes/chessMove';
import { GameBoard } from '../classes/gameBoard';

/* Chessman ability. */
export type ChessmanAbility = {

  /* Get chessman position. */
  readonly getPosition: () => ChessField;

  /* Go to a chess field position. */
  readonly goToPosition: (
    target: ChessField,
    lastMove: ChessMove,
    gameBoard: GameBoard,
  ) => ChessMove | null;
};
