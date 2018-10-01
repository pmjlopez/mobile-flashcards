import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { getDeckList } from "../utils/api"
import { receiveEntries } from "../actions/decks"
import { AppLoading } from 'expo'
import { DeckPreview, Deck } from '../components'

class DeckList extends Component {
    state = {
        ready: false
    }
    viewDeck = (deck) => {
        this.props.navigation.navigate('Deck', { id: deck.id, title: deck.title })
    }
    componentDidMount () {
        const { dispatch } = this.props
        getDeckList()
            .then((decks) => dispatch(receiveEntries(decks)))
            .then(() => this.setState(() => ({
                ready: true,
            })))
    }
    render() {
        const { decks } = this.props
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading/>
        }

        const keys = Object.keys(decks)

        if (!keys.length > 0) {
            return (
                <View>
                    <Text style={styles.noDeckText}>No decks to show. Please add deck.</Text>
                </View>
            )
        }

        return (
            <View>
                {keys.map((entry) => (
                    <DeckPreview key={entry} deck={decks[entry]} handleClick={this.viewDeck}/>
                ))}
            </View>
        )
    }
}

function mapStateToProps ({ decks }) {
    return {
        decks,
    }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
    noDeckText: {
        fontSize: 20,
        padding: 30,
        textAlign: 'center',
    },
})