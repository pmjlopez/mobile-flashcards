// import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import {DECKS_STORAGE_KEY, formatDeck } from "./_decks"

const NOTIFICATION_KEY = 'UdaciCards:notifications'

/**
 * Get list of
 */
export function getDeckList () {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            return data
        })
        .catch((e) => console.log('Error retrieving Deck List: ', e))
}

/**
 *
 * @param id
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function getDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            const deck = data[id]
            return deck
        })
        .catch((e) => console.log('Error retrieving Deck: ', e))
}

/**
 *
 * @param title
 * @returns {*}
 */
export function saveDeck (title) {
    const deck = formatDeck(title)
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck.id]: deck,
    }))
        .catch((e) => console.log(`Error saving Deck ${deck.id}: `, e))
}

/**
 *
 * @param id
 * @returns {*|PromiseLike<T | never>|Promise<T | never>}
 */
export function removeDeck (id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[id] = undefined
            delete data[id]
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
                .catch((e) => console.log(`Error removing Deck ${id}: `, e))
        })
        .catch((e) => console.log(`Error retrieving Deck ${id}: `, e))
}

/**
 *
 * @param title
 * @param card
 */
export function addCardToDeck (id, card) { // instead of title I used id using timeToString
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[id].questions.concat(card)
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
                .catch((e) => console.log(`Error adding card to Deck ${id}: `, e))
        })
        .catch((e) => console.log(`Error retrieving Deck ${id}: `, e))
}

export function getDailyReminderValue () {
    return {
        today: ":) Don't forget to study today!"
    }
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: 'Time to Learn!',
        body: ":) Don't forget to study today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        },
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}
