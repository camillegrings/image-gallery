import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps => {
        if(prevProps.isLoading && !this.props.isLoading){
            this.setState({ name: '', email: '', password: '' })
            this.props.navigation.navigate('Profile')
        }
    }

    createUser = () => {
        Keyboard.dismiss
        this.props.onCreateUser(this.state)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Galeria de Fotos</Text>
                <TextInput placeholder="Nome" style={styles.input} value={this.state.name}
                    onChangeText={name => this.setState({name})} />
                <TextInput placeholder="Email" style={styles.input} keyboardType='email-address' value={this.state.email}
                    onChangeText={email => this.setState({email})} />
                <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} value={this.state.password}
                    onChangeText={password => this.setState({password})} />
                <TouchableOpacity onPress={this.createUser} style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    button: {
        width: '80%',
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        borderRadius: 5
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'PTSerif-Regular'
    },
    input: {
        marginTop: 20,
        width: '80%',
        backgroundColor: '#efefef',
        height: 50,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 5,
        color: '#b3b3b3',
        paddingLeft: 10
    },
    title: {
        color: '#000',
        fontFamily: 'Satisfy-Regular',
        height: 70,
        fontSize: 50
    }
})

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)