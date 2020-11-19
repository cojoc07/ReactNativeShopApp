import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Platform } from "react-native";

import AuthScreen from "../screens/user/AuthScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import { submitHandler } from "../screens/user/UserProductsScreen";

import EditProductScreen from "../screens/user/EditProductScreen";
import Colors from "../constants/colors";

import { Icon } from "react-native-elements";

const AuthNavigator = createNativeStackNavigator();
const ProductsNavigator = createNativeStackNavigator();
const OrdersNavigator = createNativeStackNavigator();
const AdminNavigator = createNativeStackNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTintColor: Platform.OS === "android" ? "#000000" : "#000000",
};

const AuthNavScreens = () => {
  return (
    <AuthNavigator.Navigator screenOptions={defaultScreenOptions}>
      <AuthNavigator.Screen
        name="AuthScreen"
        component={AuthScreen}
      ></AuthNavigator.Screen>
    </AuthNavigator.Navigator>
  );
};

const OrdersNavScreens = () => {
  return (
    <OrdersNavigator.Navigator screenOptions={defaultScreenOptions}>
      <OrdersNavigator.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={({ route, navigation }) => {
          return {
            title: "Your orders",
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <Icon
                  type="ionicon"
                  size={28}
                  name={Platform.OS === "ios" ? "ios-person" : "md-person"}
                  onPress={() => {}}
                  iconStyle={{ marginHorizontal: 10 }}
                />
                <Icon
                  type="ionicon"
                  size={28}
                  name={Platform.OS === "ios" ? "ios-person" : "md-person"}
                  onPress={() => {}}
                />
              </View>
            ),
          };
        }}
      />
    </OrdersNavigator.Navigator>
  );
};

const AdminNavScreens = () => {
  return (
    <AdminNavigator.Navigator screenOptions={defaultScreenOptions}>
      <AdminNavigator.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={({ route, navigation }) => {
          return {
            headerTitle: "Your listed products",
            headerRight: () => (
              <Icon
                type="ionicon"
                size={28}
                name={Platform.OS === "ios" ? "ios-create" : "md-create"}
                onPress={() => {
                  navigation.navigate("EditProductScreen");
                }}
              />
            ),
          };
        }}
      />
      <AdminNavigator.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={({ route, navigation }) => {
          return {
            headerTitle: route.params?.productId
              ? "Edit product"
              : "Create product",
          };
        }}
      />
    </AdminNavigator.Navigator>
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
            headerTitle: "Lista de produse",
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
        <MyTab.Screen
          name="Admin"
          component={AdminNavScreens}
          headerTitle="Your stuff"
          options={({ route }) => {
            return {
              tabBarIcon: (tabInfo) => {
                return (
                  <Icon
                    type="ionicon"
                    name={
                      Platform.OS === "android" ? "md-create" : "ios-create"
                    }
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
