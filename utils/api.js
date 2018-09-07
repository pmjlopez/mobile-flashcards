import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from "./_decks"

export function submitEntry ({ entry, key }) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [key]: entry,
    }))
}
