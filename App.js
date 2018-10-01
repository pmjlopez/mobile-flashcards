import React from 'react'
import { createStore } from 'redux'
import { View, Platform, StatusBar } from 'react-native'
import { Ionicons, FontAwesome } from "@expo/vector-icons"
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import { Provider } from "react-redux"
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import reducer from './reducers'
import middleware from './middleware'
import { DeckAdd, DeckList, Deck, CardAdd, Quiz } from './components'
import { setLocalNotification } from "./utils/helpers"

function UdaciStatusBar ({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const Tabs = createMaterialTopTabNavigator(
    {
        DeckList: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
            },
        },
        DeckAdd: {
            screen: DeckAdd,
            navigationOptions: {
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
            }
        },
    },
    {
        navigationOptions: {
            header: null,
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0,0,0,0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowRadius: 6,
                shadowOpacity: 1,
            }
        }
    }
)

const MainNavigator = createStackNavigator(
    {
        DeckList: {
            screen: Tabs,
            navigationOptions: {
                header: null,
            }
        },
        Deck: {
            screen: Deck,
            navigationOptions: {
                headerTintColor: white,
                headerStyle: {
                    backgroundColor: purple,
                },
            },
        },
        CardAdd: {
            screen: CardAdd,
            navigationOptions: {
                headerTintColor: white,
                headerStyle: {
                    backgroundColor: purple,
                },
            },
        },
        Quiz: {
            screen: Quiz,
            navigationOptions: {
                headerTintColor: white,
                headerStyle: {
                    backgroundColor: purple,
                },
            },
        },
    },
)

export default class App extends React.Component {
    componentDidMount () {
        setLocalNotification()
    }
    render() {
        const store = createStore(reducer, middleware)
        return (
            <Provider store={store}>
                <View style={{ flex: 1}}>
                    <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
                    <MainNavigator/>
                </View>
            </Provider>
        )
    }
}
