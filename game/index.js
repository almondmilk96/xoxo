import { Map } from 'immutable';
import { createStore } from 'redux';

const MOVE = 'MOVE';
const initialState = {
  turn: 'X',
  board: Map(),
  winner: null,
};

export function move(player, position) {
  return {
    type: MOVE,
    position: position,
    player: player,
  };
}

export default function reducer(state = initialState, action) {
  const nextBoard = boardReducer(state.board, action);
  const winnerState = checkWinner(nextBoard);
  return {
    board: nextBoard,
    turn: turnReducer(state.turn, action),
    winner: winnerState,
  };
}

function boardReducer(board = Map(), action) {
  if (action.type === MOVE) {
    return board.setIn(action.position, action.player);
  }
  return board;
}

function turnReducer(turn = 'X', action) {
  if (action.type === MOVE) {
    return turn === 'X' ? 'O' : 'X';
  }
  return turn;
}

function checkWinner(board) {
  let winner = null;
  let leftDiagonal = (streak([[0, 0], [1, 1], [2, 2]], board))
  let rightDiagonal = (streak([[0, 2], [1, 1], [2, 0]], board))
  let topRow = (streak([[0, 0], [0, 1], [0, 2]], board))
  let middleRow = (streak([[1, 0], [1, 1], [1, 2]], board))
  let bottomRow = (streak([[2, 0], [2, 1], [2, 2]], board))
  let leftColumn = (streak([[0, 0], [1, 0], [2, 0]], board))
  let middleColumn = (streak([[0, 1], [1, 1], [2, 1]], board))
  let rightColumn = (streak([[0, 2], [1, 2], [2, 2]], board)) 
  if (leftDiagonal) {
    winner = leftDiagonal;
  } else if (rightDiagonal) {
    winner = rightDiagonal;
  } else if (topRow) {
    winner = topRow;
  } else if (middleRow) {
    winner = middleRow;
  } else if (bottomRow) {
    winner = bottomRow;
  } else if (leftColumn) {
    winner = leftColumn;
  } else if (middleColumn) {
    winner = middleColumn;
  } else if (rightColumn) {
    winner = rightColumn;
  } else if (!spaceRemains(board)) {
    winner = 'draw';
  }
  return winner;
}

//spaces are in an array
function streak(coords, board) {
  //streak returns X, 0, NULL
  const a = board.getIn(coords[0]);
  const b = board.getIn(coords[1]);
  const c = board.getIn(coords[2]);
  if (a === 'X' && b === 'X' && c === 'X') {
    return 'X';
  } else if (a === 'O' && b === 'O' && c === 'O') {
    return 'O'
  }
  return null;
}

function spaceRemains(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i] === undefined || board[i][j] === undefined) {
        return true;
      }
    }
  }
  return false;
}