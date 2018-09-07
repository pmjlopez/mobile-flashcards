import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

class CardAdd extends Component {
    state = {
        question: '',
        answer: '',
    }
    submit = () => {
        const { deck, navigation } = this.props
        const { question, answer } = this.state
        deck.questions.concat({
            question: question,
            answer: answer,
        })
    }
    render() {
        return (
            <View>
                <Text>
                    Add Question
                </Text>
            </View>
        )
    }
}

export default connect()(CardAdd)
