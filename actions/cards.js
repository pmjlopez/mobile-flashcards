import { addCardToDeck } from "../utils/api"

export const ADD_CARD = 'ADD_CARD'

function addCard (id, card) {
    return {
        type: ADD_CARD,
        id,
        card,
    }
}

export function handleAddCard (id, card) {
    return (dispatch, getState) => {
        return addCardToDeck(id, card)
            .then(() => dispatch(addCard(id, card)))
    }
}
