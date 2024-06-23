import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Image, Text } from "react-native";
import axios from "axios";

const SignupScreen = ({ navigation }) => {
  //   const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function nameChange(value) {
    setName(value);
  }

  function NavigateToSignIn() {
    navigation.navigate("Login");
  }

  const signup = () => {
    console.log("Signup button pressed");
    axios
      .post("http://192.168.0.12:3000/signup", {
        name,
        lastName,
        email,
        password,
      })
      .then((response) => {
        console.log("Signup successful:", response.data);
      })
      .catch((error) => {
        console.error(
          "Signup failed:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <>
      {/* <View>
        <TextInput placeholder="Username" onChangeText={setUsername} />
        <TextInput placeholder="Email" onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Signup" onPress={signup} />
      </View> */}
      <View style={styles.mainView}>
        <View style={styles.topView}>
          <Image
            style={styles.imageSize}
            source={require("../assets/Karim.png")}
          />
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.titleStyle}> Create your account</Text>
          <View style={styles.formStyle}>
            <View style={styles.namesView}>
              <TextInput
                style={styles.nameInputStyle}
                placeholder="First Name"
                value={name}
                onChangeText={nameChange}
              ></TextInput>
              <TextInput
                style={styles.nameInputStyle}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(val) => setLastName(val)}
              ></TextInput>
            </View>
            <TextInput
              style={styles.inputStyle}
              placeholder="Email Address"
              value={email}
              onChangeText={(val) => setEmail(val)}
            ></TextInput>
            <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(val) => setPassword(val)}
            ></TextInput>
            <Button
              title="Sign Up"
              color="black"
              backgroundColor="white"
              onPress={signup}
            />
          </View>
          <View style={styles.signUpView}>
            <Text style={styles.signUpText}>
              {" "}
              Already have an account ? Log In now !{" "}
            </Text>
            <Button
              title="Log In"
              onPress={NavigateToSignIn}
              color="black"
              backgroundColor="white"
            ></Button>
          </View>
        </View>
      </View>
    </>
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
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    width: "100%",
    height: "70%",
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
    marginTop: "10%",
    fontWeight: "bold",
    color: "black",
    display: "flex",
    textAlign: "center",
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
  nameInputStyle: {
    width: "35%",
    height: 45,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 30,
    marginRight: 9,
    marginLeft: 9,
  },
  namesView: {
    display: "flex",
    flexDirection: "row",
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

export default SignupScreen;
