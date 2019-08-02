import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback as TWF
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { addComment } from "../store/actions/posts";

class AddComment extends Component {
  state = {
    comment: "",
    editMode: false
  };

  handleAddComment = () => {
    this.props.onAddComment({
      postId: this.props.postId,
      comment: {
        nickname: this.props.name,
        comment: this.state.comment
      }
    });

    this.setState({ comment: "", editMode: false });
  };

  render() {
    let commentArea;
    const uri = this.props.profilePhoto
      ? { uri: this.props.profilePhoto }
      : require("../../assets/images/profile.jpg");
    if (this.state.editMode) {
      commentArea = (
        <View style={[styles.container, { height: 50 }]}>
          <TextInput
            placeholder="Digite o comentário"
            style={styles.input}
            autoFocus={true}
            value={this.state.comment}
            onChangeText={comment => this.setState({ comment })}
            onSubmitEditing={this.handleAddComment}
          />
          <TWF onPress={this.handleAddComment} style={styles.publishComment}>
            <Icon name="check" size={20} color="#555" />
          </TWF>
        </View>
      );
    } else {
      commentArea = (
        <TWF onPress={() => this.setState({ editMode: true })}>
          <View style={styles.container}>
            <Image source={uri} style={styles.avatar} />
            <Text style={styles.caption}>Adicione um comentário..</Text>
          </View>
        </TWF>
      );
    }
    return <View style={{ flex: 1 }}>{commentArea}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 10
  },
  caption: {
    marginLeft: 10,
    fontSize: 15,
    color: "#404040"
  },
  input: {
    width: "90%"
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginHorizontal: 10
  },
  publishComment: {
    width: 25,
    height: "100%"
  }
});

const mapStateToProps = ({ user }) => {
  return {
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddComment: payload => dispatch(addComment(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment);
