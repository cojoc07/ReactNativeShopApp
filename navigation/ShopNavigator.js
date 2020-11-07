import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Platform } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import Colors from "../constants/colors";

import { Icon } from "react-native-elements";

enableScreens();

const ProductsNavigator = createNativeStackNavigator();
const OrdersNavigator = createNativeStackNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "#000000" : "#000000",
};

const OrdersNavScreens = () => {
  return (
    <OrdersNavigator.Navigator>
      <OrdersNavigator.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={({ route, navigation }) => {
          return {
            headerTitle: "Your orders",
            headerLeft: () => (
              <Icon
                type="ionicon"
                size={28}
                name={Platform.OS === "ios" ? "ios-person" : "md-person"}
                onPress={() => {}}
              />
            ),
          };
        }}
      />
    </OrdersNavigator.Navigator>
  );
};

const ProductsNavScreens = () => {
  return (
    <ProductsNavigator.Navigator screenOptions={defaultScreenOptions}>
      <ProductsNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ route, navigation }) => {
          return {
            headerTitle: "All products!",
            headerRight: () => (
              <Icon
                type="ionicon"
                size={28}
                name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                onPress={() => navigation.navigate("CartScreen")}
              />
            ),
            headerLeft: () => (
              <Icon
                type="ionicon"
                size={28}
                name={Platform.OS === "ios" ? "ios-person" : "md-person"}
                onPress={() => {}}
              />
            ),
          };
        }}
      />
      <ProductsNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route, navigation }) => {
          return {
            headerTitle: route.params.productTitle,
            headerRight: () => (
              <Icon
                type="ionicon"
                size={28}
                name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
                onPress={() => navigation.navigate("CartScreen")}
              />
            ),
          };
        }}
      />
      <ProductsNavigator.Screen
        name="CartScreen"
        component={CartScreen}
        options={({ route, navigation }) => {
          return {
            headerTitle: "Your cart!",
          };
        }}
      />
    </ProductsNavigator.Navigator>
  );
};

const MyTab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const MyTabScreens = () => {
  return (
    <NavigationContainer>
      <MyTab.Navigator
        tabBarOptions={{
          activeTintColor: Colors.accentColor,
          inactiveTintColor: "gray",
        }}
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{ backgroundColor: Colors.primaryColor }}
      >
        <MyTab.Screen
          name="Products"
          component={ProductsNavScreens}
          options={({ route }) => {
            return {
              tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    type="ionicon"
                    name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                    size={25}
                    color={tabInfo.color}
                  />
                );
              },
            };
          }}
        />
        <MyTab.Screen
          name="Orders"
          component={OrdersNavScreens}
          options={({ route }) => {
            return {
              tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    type="ionicon"
                    name={Platform.OS === "android" ? "md-list" : "ios-list"}
                    size={25}
                    color={tabInfo.color}
                  />
                );
              },
            };
          }}
        />
      </MyTab.Navigator>
    </NavigationContainer>
  );
};

export default MyTabScreens;
