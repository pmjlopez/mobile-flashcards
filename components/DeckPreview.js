import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray } from "../utils/colors"

export default function DeckPreview (props) {
    const { deck, handleClick } = props
    const qLength = deck.questions.length
    return (
        <TouchableOpacity style={styles.container} onPress={() => handleClick(deck)}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.cards}>{qLength} card{qLength === 1 ? '' : 's'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        marginBottom: 0,
        borderColor: gray,
        borderRadius: 3,
        borderWidth: 1,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
    },
    cards: {
        textAlign: 'center',
        fontSize: 15,
    }
})
