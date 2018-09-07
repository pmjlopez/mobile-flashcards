import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { addEntry } from "../actions"
import { gray, purple } from "../utils/colors"

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params
        return {
            title: deck.title,
        }
    }
    handleAddCard = () => {
        const { deck, navigation } = this.props
        navigation.navigate('CardAdd', { deck })
    }
    render() {
        const { deck } = this.props
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
                    <TouchableOpacity>
                        <Text style={styles.button}>Start Quiz</Text>
                    </TouchableOpacity>
                    <Text style={styles.resetButton}>Delete Deck</Text>
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

function mapStateToProps (state, { navigation }) {
    const { deck } = navigation.state.params
    return {
        deck,
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    const { deck } = navigation.state.params

    return {
        remove: () => dispatch(addEntry({
            [deck.id]: null,
        })),
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
