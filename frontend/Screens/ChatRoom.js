import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";

const Chatroom = ({ groupName }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "Me" }]);
      setInputMessage("");
    }
  };
  //below is a failed attempt to fetch messages

  // useEffect(() => {
  //   fetchMessages();
  // }, []);

  // const fetchMessages = async () => {
  //   const response = await fetch("/messages");
  //   const data = await response.json();
  //   setMessages(data);
  // };

  // const sendMessage = async () => {
  //   if (inputMessage.trim() !== "") {
  //     await fetch("/messages", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         text: inputMessage,
  //         sender: "Me",
  //       }),
  //     });

  //     setInputMessage("");
  //     fetchMessages();
  //   }
  // };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Chatroom: {groupName}
      </Text>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((message, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>
              {message.sender}: {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <TextInput
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "gray",
            marginRight: 10,
            padding: 5,
          }}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default Chatroom;
