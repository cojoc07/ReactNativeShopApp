import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Platform } from "react-native";

import AuthScreen from "../screens/user/AuthScreen";
//import StartupScreen from "../screens/StartupScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

import EditProductScreen from "../screens/user/EditProductScreen";
import Colors from "../constants/colors";

import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authActions from "../store/actions/auth";

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
  const dispatch = useDispatch();
  return (
    <OrdersNavigator.Navigator screenOptions={defaultScreenOptions}>
      <OrdersNavigator.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={({ route, navigation }) => {
          return {
            title: "Comenzile tale",
            headerStyle: {
              backgroundColor: Colors.primaryColor,
            },

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
                  name={Platform.OS === "ios" ? "ios-bed" : "md-bed"}
                  onPress={() => {
                    AsyncStorage.removeItem("userData"); //state are in continuare tokenul

                    dispatch(authActions.setCredentials("", "")); //stergem si din state
                  }}
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
            headerTitle: "Produsele tale",
            headerStyle: {
              backgroundColor: Colors.primaryColor,
            },
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
            headerStyle: {
              backgroundColor: Colors.albastru,
            },
            headerTitle: route.params?.productId
              ? "Editează produs"
              : "Crează produs",
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
            headerStyle: {
              backgroundColor: Colors.primaryColor,
            },
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
            headerStyle: {
              backgroundColor: Colors.primaryColor,
            },
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
            headerTitle: "Coșul tău",
          };
        }}
      />
    </ProductsNavigator.Navigator>
  );
};

const MyTab = createMaterialBottomTabNavigator();

const MyTabScreens = () => {
  return (
    <MyTab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.accentColor,
        inactiveTintColor: "gray",
      }}
      initialRouteName="Home"
      /* activeColor="#f0edf6"
      inactiveColor="#3e2465" */
      activeColor="#FFF"
      shifting={true}
      barStyle={{ backgroundColor: Colors.primaryColor }}
    >
      <MyTab.Screen
        name="Produse"
        component={ProductsNavScreens}
        options={({ route }) => {
          return {
            tabBarColor: Colors.primaryColor,
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
        name="Comenzi"
        component={OrdersNavScreens}
        options={({ route }) => {
          return {
            tabBarColor: Colors.verde,
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
            tabBarColor: Colors.albastru,
            tabBarIcon: (tabInfo) => {
              return (
                <Icon
                  type="ionicon"
                  name={Platform.OS === "android" ? "md-create" : "ios-create"}
                  size={25}
                  color={tabInfo.color}
                />
              );
            },
          };
        }}
      />
    </MyTab.Navigator>
  );
};

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkCredentials = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        console.log("n-am gasit nimic in async storage");
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;
      const expDate = new Date(expirationDate);

      if (expDate <= new Date() || !token || !userId) {
        console.log("Am gasit token, invalid.");
        return;
      }

      console.log("Am gasit token VALID.");
      dispatch(
        authActions.setCredentials(
          transformedData.token,
          transformedData.userId
        )
      );
    };
    checkCredentials();
  }, []);

  const isAuth = useSelector((state) => state.auth?.userId);

  return (
    <NavigationContainer>
      {isAuth ? <MyTabScreens /> : <AuthNavScreens />}
    </NavigationContainer>
  );
};

export default StartupScreen;
