import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Icon name="camera-retro" size={28} color="#555" style={styles.image} />
                <Text style={styles.title}>Galeria de Fotos</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        marginRight: 10
    },
    title: {
        color: '#000',
        fontFamily: 'Satisfy-Regular',
        height: 30,
        fontSize: 25
    },
    userContainer: {
        flexDirection:'row',
        alignItems: 'center'
    },
    user: {
        fontSize: 10,
        color: '#888'
    },
    avatar: {
        width: 30,
        height:30,
        marginLeft: 10
    }
})


const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name
    }
}

export default connect(mapStateToProps)(Header)