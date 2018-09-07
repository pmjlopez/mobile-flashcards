import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    TextInput,
} from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { submitEntry } from "../utils/api"
import { connect } from 'react-redux'
import { addEntry } from "../actions"
import { gray, purple, white } from "../utils/colors"
import { NavigationActions } from 'react-navigation'
import { formatDeck } from "../utils/_decks"

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class DeckAdd extends Component {
    state = {
        title: '',
    }
    submit = () => {
        const entry = formatDeck(this.state.title)
        const key = entry.id

        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState(() => ({
            title: '',
        }))

        this.toHome()
        submitEntry({ key, entry })
        clearLocalNotification()
            .then(setLocalNotification)
    }
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'DeckAdd'
        }))
    }
    render() {
        return (
            <View style={styles.container}>
                <Text></Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState(() => ({ title: text}))}
                    value={this.state.title}
                />
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

export default connect()(DeckAdd)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
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
        alignItems: 'center'
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
