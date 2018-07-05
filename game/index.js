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
  let winner = null;
  if (streak(board)) {
    return;
  }
  return winner;
}

//spaces are in an array
function streak(board, spaces) {
  //streak returns X, 0, NULL
}
