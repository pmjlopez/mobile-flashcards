import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from "./_decks"

export function getDeckList () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            return data
        })
        .catch((e) => console.log('Error retrieving Deck List: ', e))
}

export function submitEntry (id, deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [id]: deck,
    }))
}

export function deleteDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            delete data[id]
            return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
                .catch((e) => console.warn(`Error removing Deck ${id}: `, e))
        })
        .catch((e) => console.log(`Error retrieving Deck ${id}: `, e))
}

export function addCardToDeck (id, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            let data = JSON.parse(results)
            data[id].questions = data[id].questions.concat(card)
            return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
                .catch((e) => console.log(`Error adding card to Deck ${id}: `, e))
        })
        .catch((e) => console.log(`Error retrieving Deck ${id}: `, e))
}
