import { Map } from 'immutable';
import { createStore } from 'redux';
let board = Map();
const initialState = { turn: 'X', board: board };

const MOVE = 'MOVE';

export function move(player, position) {
  return {
    type: MOVE,
    position: position,
    player: player,
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE:
      const newState = Object.assign({}, state);
      const newBoard = state.board.setIn(action.position, action.player);
      newState.board = newBoard;
      if (newState.turn === 'X') {
        newState.turn = 'O';
      } else {
        newState.turn = 'X';
      }
      return newState;
    default:
      return state;
  }
}

function winner(board) {
  //draw
  // X wins
  // 0 wins
  // game is ongoing
  let winner = null
  if (streak(board)) {
    winner = streak(board)
  } else {
    if (!spaceRemains(board)) {
      return 'draw'
    }
  }
  return winner
}

//spaces are in an array
function streak(board) {
  //streak returns X, 0, NULL
  if (board[0][0] === board[1][1] === board[2][2]) {
    return board[0][0]
  }
  if (board[0][2] === board[1][1] === board[2][0]) {
    return board[0][2]
  }
  for (let i=0; i<3; i++) {
    if (board[i][0] === board[i][1] === board[i][2]) {
      return board[i][0]
    }
    if (board[0][i] === board[1][i] === board[2][i]) {
      return board[0][i]
    }
  }
  return null
}

function spaceRemains(board) {
  for (let i=0; i<3; i++) {
    for (let i=0; i<3; i++) {
      if (!board[i][i]) {
        return true
      }
    }
  }
  return false
}