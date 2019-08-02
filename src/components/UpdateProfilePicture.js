import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-picker";
import { updateProfilePicture } from "../store/actions/user";

function UpdateProfilePicture(props) {
  pickImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Escolha a imagem de perfil",
        maxHeight: 600,
        maxWidth: 800
      },
      res => {
        if (!res.didCancel) {
          save({ uri: res.uri, base64: res.data });
        }
      }
    );
  };

  save = async image => {
    console.log(image);
    props.onUpdateProfilePicture(image);
  };

  return (
    <TouchableOpacity onPress={this.pickImage} style={styles.button}>
      <Icon name="edit" size={25} color="#555" />
      <Text style={styles.buttonText}>Atualizar foto de perfil</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 30,
    marginTop: 30,
    padding: 30,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#e3e3e3",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  buttonText: {
    fontSize: 19,
    fontFamily: "PTSerif-Regular",
    marginLeft: 10
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onUpdateProfilePicture: photo => dispatch(updateProfilePicture(photo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UpdateProfilePicture);
