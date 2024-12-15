import { ChessmanAbility } from '../types/chessmanAbility';
import { ChessSide } from '../types/chessSide';
import { ChessmanType } from '../types/chessmanType';

import { ChessMove } from './chessMove';
import { ChessField } from './chessField';

export abstract class Chessman implements ChessmanAbility {
  public constructor(
    private type: ChessmanType,
    private position: ChessField,
    private side: ChessSide
  ) {}

  public getPosition(): ChessField {
    return this.position;
  }

  public getType(): ChessmanType {
    return this.type;
  }

  public getSide(): ChessSide {
    return this.side;
  }

  public abstract goToPosition(target: ChessField): ChessMove | null;
}
