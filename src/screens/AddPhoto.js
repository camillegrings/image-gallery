import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import { addPost } from "../store/actions/posts";
import Header from "../components/Header";

class AddPhoto extends Component {
  state = {
    image: null,
    comment: ""
  };

  componentDidUpdate = prevProps => {
    if (prevProps.loading && !this.props.loading) {
      this.setState({ image: null, comment: "" });
      this.props.navigation.navigate("Feed");
    }
  };

  pickImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Escolha a imagem",
        maxHeight: 600,
        maxWidth: 800
      },
      res => {
        if (!res.didCancel) {
          this.setState({ image: { uri: res.uri, base64: res.data } });
        }
      }
    );
  };

  save = async () => {
    console.log(this.props);
    this.props.onAddPost({
      id: Math.random(),
      nickname: this.props.name,
      email: this.props.email,
      image: this.state.image,
      profilePhoto: this.props.profilePhoto,
      comments: [
        {
          nickname: this.props.name,
          comment: this.state.comment
        }
      ]
    });
  };

  goToLogin = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    if (!this.props.name) {
      return (
        <View style={styles.container}>
          <Header />
          <View style={[styles.container, { justifyContent: "center" }]}>
            <Text style={styles.title}>Funcionalidade indisponível!</Text>
            <Text style={styles.title}>
              Faça login para adicionar novas fotos.
            </Text>
            <TouchableOpacity onPress={this.goToLogin} style={styles.button}>
              <Text style={styles.buttonText}>Ir para Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header />
          <View
            style={[
              styles.imageContainer,
              this.state.image && styles.uploadedImage
            ]}
          >
            <TouchableWithoutFeedback onPress={this.pickImage}>
              {this.state.image ? (
                <Image source={this.state.image} style={styles.image} />
              ) : (
                <Icon name="upload" size={50} color="#747474" />
              )}
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.title}>
            Clique acima para escolher uma imagem
          </Text>
          <TextInput
            placeholder="Escreva uma legenda..."
            style={styles.input}
            value={this.state.comment}
            editable={!!this.props.name}
            onChangeText={comment => this.setState({ comment })}
          />
          <TouchableOpacity
            onPress={this.save}
            style={[styles.button, this.props.loading && styles.buttonDisabled]}
            disabled={this.props.loading}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    marginTop: 10
  },
  imageContainer: {
    width: "90%",
    height: Dimensions.get("window").width / 2,
    backgroundColor: "#EEE",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#747474",
    borderStyle: "dashed",
    borderRadius: 1
  },
  uploadedImage: {
    borderStyle: "solid"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  button: {
    width: "90%",
    marginTop: 30,
    padding: 10,
    backgroundColor: "#4286f4",
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#FFF",
    fontFamily: "PTSerif-Regular"
  },
  input: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#efefef",
    height: 50,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 5,
    color: "#595959",
    paddingLeft: 10
  },
  buttonDisabled: {
    backgroundColor: "#AAA"
  }
});

const mapStateToProps = ({ user, posts }) => {
  return {
    email: user.email,
    name: user.name,
    loading: posts.isUploading,
    profilePhoto: user.profilePhoto
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => dispatch(addPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhoto);
