import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { purple } from "../utils/colors"
import { NavigationActions } from "react-navigation"

class Quiz extends Component {
    static navigationOptions = () => {
        return {
            title: `Quiz`,
        }
    }
    state = {
        points: 0,
        cardIndex: 0,
        view: 'question',
    }
    toggleCard = () => {
        this.setState((state) => ({
            view: state.view === 'question' ? 'answer' : 'question'
        }))
    }
    nextCard = () => {
        this.setState((state) => ({ cardIndex: state.cardIndex + 1}))
    }
    handleCorrect = () => {
        this.setState((state) => ({ points: state.points + 1}))
        this.nextCard()
    }
    handleIncorrect = () => this.nextCard()
    handleReset = () => this.setState({
        points: 0,
        cardIndex: 0,
        view: 'question',
    })
    toDeck = () => {
        const { backKey } = this.props
        const backAction = NavigationActions.back(backKey)
        this.props.navigation.dispatch(backAction)
    }
    render() {
        const { deck } = this.props
        const { questions, title } = deck
        const { points, cardIndex, view } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                {(questions.length > 0) && (
                    <View>
                        {(cardIndex === questions.length) && (
                            <View style={styles.results}>
                                <Text>You scored</Text>
                                <Text>{Math.floor(points / questions.length * 100)}%</Text>
                                <Text>{points} out of {questions.length}</Text>
                                <View>
                                    <TouchableOpacity onPress={this.handleReset}>
                                        <Text>Restart Quiz</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.toDeck}>
                                        <Text>Back to Deck</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {(cardIndex !== questions.length) && (
                            <View>
                                {(view === 'question') && (
                                    <View>
                                        <Text style={styles.cardText}>
                                            {questions[cardIndex].question}
                                        </Text>
                                        <Text style={styles.flipText} onPress={this.toggleCard}>
                                            Show Answer
                                        </Text>
                                    </View>
                                )}
                                {(view === 'answer') && (
                                    <View>
                                        <Text style={styles.cardText}>
                                            {questions[cardIndex].answer}
                                        </Text>
                                        <Text style={styles.flipText} onPress={this.toggleCard}>
                                            Show Question
                                        </Text>
                                    </View>
                                )}
                                <View style={styles.buttons}>
                                    <TouchableOpacity onPress={this.handleCorrect} style={styles.button}>
                                        <Text>Correct</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.handleIncorrect} style={styles.button}>
                                        <Text>Incorrect</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.paging}>{cardIndex + 1} of {questions.length}</Text>
                            </View>
                        )}
                    </View>
                )}
                {(!questions.length > 0) && (
                    <Text style={styles.noCards}>
                        Sorry, you cannot take a quiz because there are no cards in the deck.
                    </Text>
                )}
            </View>
        )
    }
}

function mapStateToProps({ decks }, { navigation }) {
    const { id } = navigation.state.params
    return {
        deck: decks[id],
        backKey: navigation.state.key,
    }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 30,
        textAlign: 'center',
        padding: 30,
        flex: 1,
    },
    cardText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 30,
    },
    flipText: {
        textAlign: 'center',
    },
    noCards: {
        padding: 30,
        textAlign: 'center',
        fontSize: 12,
    },
    buttons: {
    },
    button: {
        borderColor: purple,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    paging: {
        textAlign: 'center',
    },
    results: {
        alignItems: 'center',
    },
})
