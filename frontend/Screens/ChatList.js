import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChatListPage = ({ route }) => {
  const navigation = useNavigation();
  const handleGroupPress = (groupName) => {
    navigation.navigate("Chatroom", { groupName });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const handleButtonPress = () => {
    setModalVisible(true);
  };

  const initialGroups = [
    {
      id: 1,
      groupName: "Alhousseini",
      lastMessage: "Salut",
    },
    {
      id: 2,
      groupName: "Vincenzo",
      lastMessage: "On est en salle A328.",
    },
    {
      id: 3,
      groupName: "Nathanael",
      lastMessage: "Bonjour Monsieur",
    },
    {
      id: 4,
      groupName: "Dad",
    },
  ];

  const userId = route.params?.userId;

  useEffect(() => {
    // Fetch chat list or other user-specific data using userId
  }, [userId]);

  const [groupList, setGroupList] = useState(initialGroups);

  return (
    <>
      <View style={styles.container}>
        {/* <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingBottom: 10,
            paddingTop: 25,
          }}
        ></Text> */}
        <Button title="New Chat" onPress={handleButtonPress} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)} // Close the modal when the transparent area is pressed
          ></TouchableOpacity>
          <View style={styles.modalContainer}>
            {/* Add your modal content here */}
          </View>
        </Modal>
        <View>{/* Modal Content */}</View>
        <FlatList
          data={groupList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleGroupPress(item.groupName)}>
              <View style={styles.groupContainer}>
                <Text style={styles.groupTitle}>{item.groupName}</Text>
                <Text style={styles.lastMessageStyle}>{item.lastMessage}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  modalContainer: {
    position: "absolute",
    backgroundColor: "beige",
    top: "30%",
    left: "37.5%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    borderRadius: 10,
    height: 500,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  groupContainer: {
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  lastMessageStyle: {
    fontSize: 14,
    color: "#555",
  },
});

export default ChatListPage;