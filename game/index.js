import {Map} from 'immutable'
import { createStore } from 'redux'
let board = Map()

export default function reducer(state, action) {
  switch (action.type) {
    case MOVE: 
      board = board.setIn(action.position, action.player)
      if (action.player === 'X') {
        board = board.set(turn, 'O')
      } else {
        board = board.set(turn, 'X')
      }
    default: 
      return state
  }
}


function MOVE(player, position) {
  return {
    type: MOVE,
    position: position,
    player: player
  }
}