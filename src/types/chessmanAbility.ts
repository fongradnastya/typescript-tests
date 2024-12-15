import { ChessField } from '../classes/chessField';
import { ChessMove } from '../classes/chessMove';

/* Chessman ability. */
export type ChessmanAbility = {

  /* Get chessman position. */
  readonly getPosition: () => ChessField;

  /* Go to a chess field position. */
  readonly goToPosition: (target: ChessField) => ChessMove | null;
};
