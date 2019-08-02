import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import { logout } from "../store/actions/user";
import UpdateProfilePicture from "../components/UpdateProfilePicture";

class Profile extends Component {
  logout = () => {
    this.props.onLogout();
    this.props.navigation.navigate("Auth");
  };

  render() {
    const uri = this.props.profilePhoto
      ? { uri: this.props.profilePhoto }
      : require("../../assets/images/profile.jpg");
    return (
      <View style={styles.container}>
        <View style={styles.avatarBackground} />
        <Image source={uri} style={styles.avatar} />
        <Text style={styles.nickname}>{this.props.name}</Text>
        <Text style={styles.email}>{this.props.email}</Text>
        <UpdateProfilePicture />
        <TouchableOpacity onPress={this.logout} style={styles.button}>
          <Icon name="log-out" size={25} color="#555" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative"
  },
  avatarBackground: {
    height: "30%",
    width: Dimensions.get("window").width,
    backgroundColor: "#4286f4",
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    zIndex: -1
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginTop: 100,
    borderWidth: 1,
    borderColor: "#FFF"
  },
  content: {
    flex: 2,
    backgroundColor: "#efefef"
  },
  nickname: {
    marginTop: 25,
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "PTSerif-Regular"
  },
  email: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: "PTSerif-Regular"
  },
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

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name,
    id: user.id,
    profilePhoto: user.profilePhoto
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
