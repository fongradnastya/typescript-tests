import { ChessField } from '../src/classes/chessField';
import { GameBoard } from '../src/classes/gameBoard';
import { Queen } from '../src/classes/queen';
import { Pawn } from '../src/classes/pawn';
import { ChessSide } from '../src/types/chessSide';
import { ChessmanType } from '../src/types/chessmanType';

describe('Queen', () => {
  let gameBoard: GameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test('should move horizontally to an empty field', () => {
    const queen = new Queen(1, ChessmanType.Queen, new ChessField(4, 4), ChessSide.White);
    const target = new ChessField(4, 7);

    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = queen.goToPosition(target, null, gameBoard);
    expect(move).not.toBeNull();
    expect(move?.getTargetPosition()).toEqual(target);
    expect(move?.getCapturedChessman()).toBeNull();
  });

  test('should move vertically to an empty field', () => {
    const queen = new Queen(1, ChessmanType.Queen, new ChessField(4, 4), ChessSide.White);
    const target = new ChessField(7, 4);

    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = queen.goToPosition(target, null, gameBoard);
    expect(move).not.toBeNull();
    expect(move?.getTargetPosition()).toEqual(target);
    expect(move?.getCapturedChessman()).toBeNull();
  });

  test('should move diagonally to an empty field', () => {
    const queen = new Queen(1, ChessmanType.Queen, new ChessField(4, 4), ChessSide.White);
    const target = new ChessField(7, 7);

    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = queen.goToPosition(target, null, gameBoard);
    expect(move).not.toBeNull();
    expect(move?.getTargetPosition()).toEqual(target);
    expect(move?.getCapturedChessman()).toBeNull();
  });

  test('should return null for invalid move', () => {
    const queen = new Queen(1, ChessmanType.Queen, new ChessField(4, 4), ChessSide.White);
    const target = new ChessField(5, 6);

    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(false);

    const move = queen.goToPosition(target, null, gameBoard);
    expect(move).toBeNull();
  });

  test('should return null if path is blocked', () => {
    const queen = new Queen(1, ChessmanType.Queen, new ChessField(4, 4), ChessSide.White);
    const target = new ChessField(4, 7);

    jest.spyOn(gameBoard, 'isFieldOccupied').mockReturnValue(true);

    const move = queen.goToPosition(target, null, gameBoard);
    expect(move).toBeNull();
  });

  test('should capture opponent piece', () => {
    const queen = new Queen(1, ChessmanType.Queen, new ChessField(4, 4), ChessSide.White);
    const target = new ChessField(4, 7);
    const pawn = new Pawn(2, ChessmanType.Pawn, target, ChessSide.Black);
    gameBoard.placeChessman(pawn);
    gameBoard.placeChessman(queen);

    const move = queen.goToPosition(target, null, gameBoard);
    expect(move).not.toBeNull();
    expect(move?.getTargetPosition()).toEqual(target);
    expect(move?.getCapturedChessman()).toBe(pawn);
  });

  test('should not capture piece of the same side', () => {
    const queen = new Queen(1, ChessmanType.Queen, new ChessField(4, 4), ChessSide.White);
    const target = new ChessField(4, 7);
    const pawn = new Pawn(2, ChessmanType.Pawn, target, ChessSide.White);
    gameBoard.placeChessman(pawn);
    gameBoard.placeChessman(queen);

    const move = queen.goToPosition(target, null, gameBoard);
    expect(move).toBeNull();
  });
});