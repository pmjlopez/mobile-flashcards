export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const ADD_CARD = 'ADD_CARD'

export function receiveEntries (entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries,
    }
}

export function addEntry (entry) {
    return {
        type: ADD_ENTRY,
        entry,
    }
}

export function addCard () {
    
}