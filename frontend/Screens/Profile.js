import React, { useState, useEffect } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProfileScreen = () => {
  //   const [user, setUser] = useState(null);
  const route = useRoute();
  //   const [token, setToken] = useState(null);
  const [bio, setBio] = useState("");

  //   useEffect(() => {
  //     const { user: userInfo } = route.params || {};
  //     setUser(userInfo);
  //   }, [route.params]);

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await axios.get("/user", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setUser(response.data);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     };

  //     fetchUserData();
  //   }, [token]);

  //   if (!user) {
  //     return <Text>Loading...</Text>;
  //   }

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
      {/* <Text style={styles.label}>First Name:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.value}>{user.lastName}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>Password:</Text>
      <Text style={styles.value}>{"*".repeat(user.password?.length || 8)}</Text> */}

      <TextInput
        style={styles.bioInput}
        placeholder="Enter your bio/status"
        value={bio}
        onChangeText={setBio}
      />
      <Button title="Update Bio" onPress={updateBio} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProfileScreen;
