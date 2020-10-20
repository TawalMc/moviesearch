/* eslint-disable prettier/prettier */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../components/Search";
import FilmDetail from "../components/FilmDetail";
import Favorites from "../components/Favorites";
import { StyleSheet, Image, Text, View } from "react-native";
import Info from "../components/Info";

const Stack = createStackNavigator();
const TabBottom = createBottomTabNavigator();

const TabBottomView = ({ name, img, color}) => {
  return (
    <View style={styles.tab_container}>
      <Image style={styles.tab_img} source={img} />
      <Text style={[styles.tab_title, { color: color }]}> {name} </Text>
    </View>
  );
};

const NavStackSearch = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={FilmDetail} />
    </Stack.Navigator>
  );
};

const NavStackFavorites = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Detail" component={FilmDetail} />
    </Stack.Navigator>
  );
}

const NavStackInfo = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Infos" component={Info} />
    </Stack.Navigator>
  );
}

const NavTab = () => {
  return (
    <TabBottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          var tab_bottom_img;
          if (route.name === "Search") {
            tab_bottom_img = require("../Images/ic_search.png");
          } else if (route.name === "Favorites") {
            tab_bottom_img = require("../Images/ic_favorite.png");
          } else if (route.name === "Infos") {
            tab_bottom_img = require("../Images/ic_info.png");
          }
          return (
            <TabBottomView
              name={route.name}
              color={color}
              img={tab_bottom_img}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#f5864e",
        inactiveTintColor: "gray",
        showLabel: false,
      }}
    >
      <TabBottom.Screen name="Search" component={NavStackSearch} />
      <TabBottom.Screen name="Favorites" component={NavStackFavorites} />
      <TabBottom.Screen name="Infos" component={NavStackInfo} />
    </TabBottom.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <NavTab />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tab_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tab_img: {
    width: 20,
    height: 20,
  },
  tab_title: {
    fontStyle: "italic",
    fontSize: 15,
    fontWeight: "bold"
  },
});

export default Navigation;
