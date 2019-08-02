import React from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux'
import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComment'

function Post(props) {
    return (
        <View style={styles.container}>
            <Author email={props.email} nickname={props.nickname} />
            <View style={styles.imageContainer}>
                <Image source={{ uri: props.image }} style={styles.image} />
            </View>
            <Comments comments={props.comments} />
            {props.name && <AddComment postId={props.id} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    imageContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
    },
    image: {
        flex: 1,
        width: undefined, 
        height: undefined
    }
})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name
    }
}

export default connect(mapStateToProps)(Post)