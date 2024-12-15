import { ChessField } from './chessField';
import { Chessman } from './chessman';

export class GameBoard {
  private board: Map<string, Chessman | null>;

  constructor() {
    this.board = new Map();
  }

  // Add a chessman to the board
  public placeChessman(chessman: Chessman): void {
    const positionKey = this.getPositionKey(chessman.getPosition());
    this.board.set(positionKey, chessman);
  }

  // Remove a chessman from the board
  public removeChessman(position: ChessField): void {
    const positionKey = this.getPositionKey(position);
    this.board.set(positionKey, null);
  }

  // Check if a field is occupied
  public isFieldOccupied(position: ChessField): boolean {
    const positionKey = this.getPositionKey(position);
    return this.board.has(positionKey) && this.board.get(positionKey) !== null;
  }

  // Get the chessman at a specific field
  public getChessmanAt(position: ChessField): Chessman | null {
    const positionKey = this.getPositionKey(position);
    return this.board.get(positionKey) || null;
  }

  // Convert ChessField to a unique key (e.g., "A2")
  private getPositionKey(position: ChessField): string {
    return `${position.getColumn()}${position.getRow()}`;
  }
}