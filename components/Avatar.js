import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Text, Alert } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";

const Avatar = (props) => {
  const [avatar, setAvatar] = useState(require("../Images/ic_tag_faces.png"));

  function _avatarClicked() {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        Alert.alert("You have canceled action.");
      } else if (response.error) {
        Alert.alert("An error occurs when trying to take photo.");
      } else {
        let requireSource = { uri: response.uri };
        const action = {type: 'SET_AVATAR', value: requireSource}
        
        props.dispatch(action);
        setAvatar(props.avatar)
      }
    });
  }

  useEffect(() => {
    setAvatar(props.avatar)
  })

  return (
    <TouchableOpacity style={styles.container} onPress={_avatarClicked}>
      {/* {console.log(props.avatar)} */}
      <Image style={styles.avatar_img} source={avatar} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    borderRadius: 45,

    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    marginTop: 10,
    /* borderWidth: 2,
    borderColor: "black", */
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  avatar_img: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
});

const mapStateToProps = (state) => {
  return {
    avatar: state.setAvatar.avatar
  }
}

export default connect(mapStateToProps)(Avatar);
