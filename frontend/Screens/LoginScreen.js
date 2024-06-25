import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
} from "react-native";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function NavigateToSignUp() {
    navigation.navigate("Signup");
  }

  const login = () => {
    axios
      .post("http://192.168.0.12:3000/login", { email, password })
      .then((response) => {
        // handle login success
        navigation.navigate("home");
      })
      .catch((error) => {
        // handle login failure
        Alert.alert("Oops...", "Your username or password is incorrect !", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      });
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
        <Image
          style={styles.imageSize}
          source={require("../assets/Karim.png")}
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.titleStyle}>Welcome Back </Text>
        <View style={styles.formStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          ></TextInput>
          <Button
            title="Log In"
            color="black"
            backgroundColor="white"
            onPress={login}
          />
        </View>
        <View style={styles.signUpView}>
          <Text style={styles.signUpText}>
            {" "}
            Don't have an account ? Create one now !{" "}
          </Text>
          <Button
            title="Sign Up"
            onPress={NavigateToSignUp}
            color="black"
            backgroundColor="white"
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    width: "100%",
    height: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    width: "100%",
    height: "60%",
    backgroundColor: "#f2e3aa",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  imageSize: {
    width: "100%",
    resizeMode: "contain",
  },
  titleStyle: {
    fontSize: 30,
    marginLeft: "22%",
    marginTop: "10%",
    fontWeight: "bold",
    color: "black",
  },
  formStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 35,
  },
  inputStyle: {
    width: "75%",
    height: 45,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 30,
  },
  signUpView: {
    display: "flex",
    alignItems: "center",
    paddingTop: 15,
  },
  signUpText: {
    paddingBottom: 15,
  },
});

export default LoginScreen;
