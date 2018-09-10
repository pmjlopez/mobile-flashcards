import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray } from "../utils/colors"
import { handleRemoveDeck } from "../actions/decks"
import Quiz from "./Quiz"
import {NavigationActions} from "react-navigation";

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title: title,
        }
    }
    handleAddCard = () => {
        const { deck, navigation } = this.props
        navigation.navigate('CardAdd', { id: deck.id })
    }
    handleStartQuiz = () => {
        const { deck, navigation } = this.props
        navigation.navigate('Quiz', { id: deck.id })
    }
    handleRemoveDeck = () => {
        const { dispatch, deck } = this.props
        dispatch(handleRemoveDeck(deck.id))
        this.toList()
    }
    toList = () => {
        const { backKey } = this.props
        this.props.navigation.dispatch(NavigationActions.back({
            key: backKey
        }))
    }
    render() {
        const { deck } = this.props
        if (!deck) {
            return (
                <View>
                    <Text>
                        The deck does not exist.
                    </Text>
                </View>
            )
        }
        const qLength = deck.questions.length
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.cards}>{qLength} card{qLength === 1 ? '' : 's'}</Text>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity onPress={this.handleAddCard}>
                        <Text style={styles.button}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleStartQuiz}>
                        <Text style={styles.button}>Start Quiz</Text>
                    </TouchableOpacity>
                    <Text onPress={this.handleRemoveDeck} style={styles.resetButton}>Delete Deck</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    top: {
        flex: 1,
        justifyContent: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
    },
    cards: {
        textAlign: 'center',
        fontSize: 15,
    },
    button: {
        padding: 10,
        margin: 30,
        marginBottom: 0,
        borderColor: gray,
        borderRadius: 3,
        borderWidth: 1,
        textAlign: 'center',
    },
    resetButton: {
        margin: 30,
        padding: 10,
        textAlign: 'center',
    },
})

function mapStateToProps ({ decks }, { navigation }) {
    const { id } = navigation.state.params
    const deck = decks[id]
    return {
        deck,
        backKey: navigation.state.key,
    }
}

export default connect(mapStateToProps)(Deck)
