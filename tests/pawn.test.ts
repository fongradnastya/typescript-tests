import { Pawn } from '../src/classes/pawn';
import { ChessField } from '../src/classes/chessField';
import { ChessMove } from '../src/classes/chessMove';
import { GameBoard } from '../src/classes/gameBoard';
import { Queen } from '../src/classes/queen';
import { ChessSide } from '../src/types/chessSide';
import { ChessmanType } from '../src/types/chessmanType';

describe('Pawn', () => {
  let gameBoard: GameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard(); // Mock GameBoard initialization
  });

  test('should move forward one step if not blocked', () => {
    const pawn = new Pawn(1, ChessmanType.Pawn, new ChessField(2, 1), ChessSide.White);

    const target = new ChessField(3, 1);
    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = pawn.goToPosition(target, null, gameBoard);
    expect(move).not.toBeNull();
    expect(move?.getTargetPosition()).toEqual(target);
    expect(move?.getCapturedChessman()).toBeNull();
  });

  test('should not move forward if the target field is occupied', () => {
    const pawn = new Pawn(2, ChessmanType.Pawn, new ChessField(2, 1), ChessSide.White);

    const target = new ChessField(3, 1);
    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(true);

    const move = pawn.goToPosition(target, null, gameBoard);
    expect(move).toBeNull();
  });

  test('should capture diagonally', () => {
    const pawn = new Pawn(3, ChessmanType.Pawn, new ChessField(2, 1), ChessSide.White);

    const target = new ChessField(3, 2);
    jest.spyOn(gameBoard, 'isFieldOccupied').mockImplementation((field) => field === target);

    const move = pawn.goToPosition(target, null, gameBoard);
    expect(move).not.toBeNull();
    expect(move?.getTargetPosition()).toEqual(target);
    expect(move?.getCapturedChessman()).toBeNull();
  });

  test('should promote to queen when reaching the last rank', () => {
    const pawn = new Pawn(4, ChessmanType.Pawn, new ChessField(7, 1), ChessSide.White);

    const target = new ChessField(8, 1);
    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = pawn.goToPosition(target, null, gameBoard);
    expect(move).not.toBeNull();
    expect(move?.getChessman()).toBeInstanceOf(Queen);
    expect(move?.getCapturedChessman()).toBeNull();
  });

  test('should not move diagonally if target field is empty', () => {
    const pawn = new Pawn(5, ChessmanType.Pawn, new ChessField(2, 1), ChessSide.White);

    const target = new ChessField(3, 2);
    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = pawn.goToPosition(target, null, gameBoard);
    expect(move).toBeNull();
  });

  test('should execute en passant correctly', () => {
    const pawn = new Pawn(6, ChessmanType.Pawn, new ChessField(5, 4), ChessSide.White);

    const lastMove = new ChessMove(
      new ChessField(7, 4),
      new ChessField(5, 4),
      new Pawn(7, ChessmanType.Pawn, new ChessField(5, 4), ChessSide.Black)
    );

    const target = new ChessField(6, 4);
    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = pawn.goToPosition(target, lastMove, gameBoard);
    expect(move).not.toBeNull();
    expect(move?.getTargetPosition()).toEqual(target);
    expect(move?.getCapturedChessman()?.getId()).toEqual('pawn2');
  });

  test('should not execute en passant if conditions are not met', () => {
    const pawn = new Pawn(8, ChessmanType.Pawn, new ChessField(5, 4), ChessSide.White);

    const lastMove = new ChessMove(
      new ChessField(7, 4),
      new ChessField(6, 4),
      new Pawn(9, ChessmanType.Pawn, new ChessField(6, 4), ChessSide.Black)
    );

    const target = new ChessField(6, 4);
    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = pawn.goToPosition(target, lastMove, gameBoard);
    expect(move).toBeNull();
  });

  test('should not move backwards', () => {
    const pawn = new Pawn(10, ChessmanType.Pawn, new ChessField(3, 1), ChessSide.White);

    const target = new ChessField(2, 1);
    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = pawn.goToPosition(target, null, gameBoard);
    expect(move).toBeNull();
  });

  test('should not move outside the board', () => {
    const pawn = new Pawn(11, ChessmanType.Pawn, new ChessField(8, 1), ChessSide.White);
    const target = new ChessField(9, 1);
    const move = pawn.goToPosition(target, null, gameBoard);
    expect(move).toBeNull();
  });
});