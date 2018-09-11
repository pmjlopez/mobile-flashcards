export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

function timeToString () {
    const date = new Date()
    return date.toISOString()
}

export function formatDeck (title, id = null, questions = []) {
    const deckId = id ? id : timeToString()
    const deckQuestions = questions ? questions : []
    return {
        id: deckId,
        title: title,
        questions: deckQuestions,
    }
}
