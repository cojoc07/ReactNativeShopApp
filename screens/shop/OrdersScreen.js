import React from "react";
import {
  View,
  FlatList,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <View>
      <StatusBar
        translucent={true}
        barStyle={Platform.OS == "android" ? "auto" : "dark-content"}
      />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View>
            <Text>TEST</Text>
            <Text>{itemData.item.totalAmount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrdersScreen;
