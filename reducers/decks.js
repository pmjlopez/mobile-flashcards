import {RECEIVE_ENTRIES, ADD_DECK, REMOVE_DECK} from "../actions/decks"
import { ADD_CARD } from "../actions/cards"

export default function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_ENTRIES :
            return {
                ...state,
                ...action.entries
            }
        case ADD_DECK :
            return {
                ...state,
                [action.deck.id]: action.deck
            }
        case ADD_CARD :
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    questions: state[action.id].questions.concat(action.card)
                }
            }
        case REMOVE_DECK :
            const { [action.id]: value, ...removedDeck } = state
            return removedDeck
        default:
            return state
    }
}
