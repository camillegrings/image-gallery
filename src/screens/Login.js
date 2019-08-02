import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    login = () => {
        Keyboard.dismiss
        this.props.onLogin({ ...this.state })
    }

    componentDidUpdate = prevProps => {
        if(prevProps.isLoading && !this.props.isLoading){
            this.props.navigation.navigate('Profile')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Galeria de Fotos</Text>
                <TextInput placeholder="Email" style={styles.input} keyboardType='email-address' value={this.state.email}
                    onChangeText={email => this.setState({email})} />
                <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} value={this.state.password}
                    onChangeText={password => this.setState({password})} />
                <TouchableOpacity onPress={this.login} style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.buttonLink}>
                    <Text style={styles.buttonLinkText}>Não tem uma conta?</Text>
                    <Text style={[styles.buttonLinkText, { fontWeight: 'bold', paddingLeft: 5 }]}>Cadastre-se.</Text>
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
        color: '#595959',
        paddingLeft: 10
    },
    title: {
        color: '#000',
        fontFamily: 'Satisfy-Regular',
        height: 70,
        fontSize: 50
    },
    buttonLink: {
        width: '80%',
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLinkText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#404040',
        fontFamily: 'PTSerif-Regular',
        textDecorationLine: 'underline'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)