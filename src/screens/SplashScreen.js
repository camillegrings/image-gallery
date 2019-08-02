import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, View, Text } from 'react-native'

export default class Splash extends Component {
    componentDidMount = () => {
        setTimeout(
            () => { this.props.navigation.navigate('App')}, 2000
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name="camera-retro" size={200} color="#555"/>
                <Text style={styles.header}>Galeria de Fotos</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 50,
        color: '#000',
        fontFamily: 'Satisfy-Regular'
    }
})