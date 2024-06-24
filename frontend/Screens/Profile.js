import React, { useState, useEffect } from "react";
import { Button, TextInput, View, StyleSheet, Text, Alert } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProfileScreen = () => {
  //   const [user, setUser] = useState(null);
  const route = useRoute();
  //   const [token, setToken] = useState(null);
  const [bio, setBio] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");

  // useEffect(() => {
  const fetchUserBio = async () => {
    const userId = route.params?.userId;

    if (!userId) {
      console.error("User ID is undefined or null. Cannot fetch bio.");
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.0.12:3000/user/${userId}/bio`
      );
      setBio(response.data.bio);
      setUpdatedBio(response.data.bio);
    } catch (error) {
      console.error("Error fetching user bio:", error);
    }
  };

  //   fetchUserBio();
  // }, [route.params?.userId]);

  const updateBio = () => {
    const userId = route.params?.userId;

    if (!userId) {
      console.error("User ID is undefined or null. Cannot update bio.");
      return;
    }

    axios
      .put(`http://192.168.0.12:3000/user/${userId}`, { bio })
      .then((response) => {
        console.log("Bio updated:", response.data);
        Alert.alert("Super !", "Your bio has been successfully updated");
        setBio("");
        setUpdatedBio(response.data.bio);
      })
      .catch((error) => {
        console.error("Failed to update bio:", error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request error:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      });
  };
  return (
    <View style={styles.mainView}>
      <Text style={styles.label}> Bio/Status:</Text>
      <Text style={styles.value}>{updatedBio}</Text>
      {/* 

      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.value}>{user.lastName}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Password:</Text>
      <Text style={styles.value}>{"*".repeat(user.password?.length || 8)}</Text> */}
      {/* <Text>{bio}</Text> */}

      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={(text) => setBio(text)}
        placeholder="Enter your bio/status"
        multiline
      />
      <Button
        title="Update Bio"
        onPress={updateBio}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "black", // Example border color
    borderRadius: 5,
  },
});

export default ProfileScreen;
