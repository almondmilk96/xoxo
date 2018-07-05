import { Map } from 'immutable';
import { createStore } from 'redux';

const MOVE = 'MOVE';
const initialState = {
  turn: 'X',
  board: Map(),
  winner: 'banana',
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
  if (streak(board)) {
    winner = streak(board);
  } else if (!spaceRemains(board)) {
    return 'draw';
  }
  return winner;
}

//spaces are in an array
function streak(board) {
  //streak returns X, 0, NULL
  if (
    board[0] &&
    board[0][0] &&
    (board[0][0] === board[1][1]) === board[2][2]
  ) {
    return board[0][0];
  }
  if (
    board[0] &&
    board[0][2] &&
    (board[0][2] === board[1][1]) === board[2][0]
  ) {
    return board[0][2];
  }
  for (let i = 0; i < 3; i++) {
    if (
      board[i] &&
      board[i][0] &&
      (board[i][0] === board[i][1]) === board[i][2]
    ) {
      return board[i][0];
    }
    if (
      board[0] &&
      board[0][i] &&
      (board[0][i] === board[1][i]) === board[2][i]
    ) {
      return board[0][i];
    }
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
