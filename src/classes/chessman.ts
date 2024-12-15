import { ChessmanAbility } from '../types/chessmanAbility';
import { ChessSide } from '../types/chessSide';
import { ChessmanType } from '../types/chessmanType';

import { ChessMove } from './chessMove';
import { ChessField } from './chessField';
import { GameBoard } from './gameBoard';

export abstract class Chessman implements ChessmanAbility {

  private readonly moveHistory: ChessMove[] = [];

  public constructor(
    private readonly id: number,
    private readonly type: ChessmanType,
    private readonly position: ChessField,
    private readonly side: ChessSide
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

  public getId(): number {
    return this.id;
  }

  public getLastMove(): ChessMove | null {
    return this.moveHistory.at(-1) ?? null;
  }

  public saveMove(move: ChessMove): void {
    this.moveHistory.push(move);
  }

  public hasMoved(): boolean {
    return this.moveHistory.length > 0;
  }

  public abstract goToPosition(
    target: ChessField,
    lastMove: ChessMove,
    gameBoard: GameBoard,
  ): ChessMove | null;

  public asString(): string {
    return `piece ${this.getId} ${this.getSide} ${this.getType}`;
  }
}
