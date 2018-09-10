import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { gray, purple, white } from "../utils/colors"
import { handleAddCard } from "../actions/cards"

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class CardAdd extends Component {
    static navigationOptions = () => {
        return {
            title: `Add Card`,
        }
    }
    state = {
        question: '',
        answer: '',
    }
    submit = () => {
        const { deck } = this.props
        const { question, answer } = this.state
        const card = {
            question: question,
            answer: answer,
        }

        this.props.dispatch(handleAddCard(deck.id, card))

        this.setState(() => ({
            question: '',
            answer: '',
        }))

        this.toDeck()
    }
    toDeck = () => {
        const { backKey } = this.props
        this.props.navigation.dispatch(NavigationActions.back({
            key: backKey
        }))
    }
    render() {
        const { deck } = this.props
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior={`padding`} enabled>
                <View style={styles.row}>
                    <Text style={styles.title}>{deck.title}</Text>
                </View>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.textInput}
                        value={question}
                        onChangeText={(text) => { this.setState(() => ({ question: text}))}}
                        placeholder={`Question`}
                    />
                    <TextInput
                        style={styles.textInput}
                        value={answer}
                        onChangeText={(text) => { this.setState(() => ({ answer: text}))}}
                        placeholder={`Answer`}
                    />
                </View>
                <View style={styles.row}>
                    <SubmitBtn onPress={this.submit}/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps ({ decks }, { navigation }) {
    const { id } = navigation.state.params
    const deck = decks[id]
    return {
        deck,
        backKey: navigation.state.key,
    }
}

export default connect(mapStateToProps)(CardAdd)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    inputRow: {
        flexDirection: 'column',
    },
    textInput: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: 'flex-end',
        alignItems: 'center',
        margin: 40,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})
