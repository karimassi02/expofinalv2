import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Profile";
import ChatListPage from "./ChatList";
import { Image } from "react-native";
import ContactListPage from "./ContactList";

export default function HomeNav() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconImage;

          if (route.name === "Chats") {
            iconImage = focused
              ? require("../assets/chaticon.png") // Path to active chat icon
              : require("../assets/chaticon.png"); // Path to inactive chat icon
          } else if (route.name === "Profile") {
            iconImage = focused
              ? require("../assets/profileicon.webp") // Path to active profile icon
              : require("../assets/profileicon.webp"); // Path to inactive profile icon
          } else if (route.name === "Contacts") {
            iconImage = focused
              ? require("../assets/contactsicon.png") // Path to active contact icon
              : require("../assets/contactsicon.png"); // Path to inactive contact icon
          }

          // Return the Image component as the tab bar icon
          return <Image source={iconImage} style={{ width: 24, height: 24 }} />;
        },
      })}
    >
      <Tab.Screen name="Chats" component={ChatListPage} />
      <Tab.Screen name="Contacts" component={ContactListPage} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ userId: "6677fa7f47593e1daf8fe43e" }}
      />
    </Tab.Navigator>
  );
}
