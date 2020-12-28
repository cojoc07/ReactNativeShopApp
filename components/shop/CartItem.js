import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";

import { Icon } from "react-native-elements";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.price}>Lei {props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          {props.canDelete && (
            <Icon
              type="ionicon"
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginBottom: 5,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
    marginRight: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    maxWidth: "90%",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
