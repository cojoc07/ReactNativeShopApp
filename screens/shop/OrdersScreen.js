import React, { useState, useEffect } from "react";

import {
  ActivityIndicator,
  View,
  FlatList,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import Colors from "../../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/orders";

const OrdersScreen = ({ route, navigation }) => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  //cand se focuseaza acest screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      //alert("Default behavior prevented");
      console.log("s-a focusat ecranul Orders");
    });

    //se intoarce functia unsubscribe deci se elimina subscriptia
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

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
          <OrderItem
            items={itemData.item.items}
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
