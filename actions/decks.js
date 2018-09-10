import { submitEntry, deleteDeck } from "../utils/api"

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveEntries (entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries,
    }
}

function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function handleAddDeck (deck) {
    return (dispatch) => {
        return submitEntry(deck.id, deck)
            .then(() => dispatch(addDeck(deck)))
    }
}

function removeDeck (id) {
    return {
        type: REMOVE_DECK,
        id
    }
}

export function handleRemoveDeck (id) {
    return (dispatch) => {
        return deleteDeck(id)
            .then(() => dispatch(removeDeck(id)))
    }
}