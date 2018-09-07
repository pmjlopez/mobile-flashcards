/**
 *
 * @type {string}
 */
export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

/**
 *
 * @returns {string}
 */
function timeToString () {
    const date = new Date()
    return date.toISOString()
}

/**
 *
 * @param title
 * @returns {{id: string, title: *, questions: Array}}
 */
export function formatDeck (title, id = null, questions = []) {
    const deckId = id ? id : timeToString()
    const deckQuestions = questions ? questions : []
    return {
        id: deckId,
        title: title,
        questions: deckQuestions,
    }
}
