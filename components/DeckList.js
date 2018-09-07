import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { getDeckList } from "../utils/helpers"
import { receiveEntries } from "../actions"
import { AppLoading } from 'expo'
import DeckPreview from "./DeckPreview"
import Deck from './Deck'

class DeckList extends Component {
    state = {
        ready: false
    }
    viewDeck = (deck) => {
        this.props.navigation.navigate('Deck', { deck: deck })
    }
    componentDidMount () {
        const { dispatch } = this.props
        getDeckList()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(() => this.setState(() => ({
                ready: true,
            })))
    }
    render() {
        const { entries, navigation } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading/>
        }

        return (
            <View>
                {Object.keys(entries).map((entry) => (
                    <DeckPreview key={entry} deck={entries[entry]} handleClick={this.viewDeck}/>
                ))}
            </View>
        )
    }
}

function mapStateToProps (entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(DeckList)
