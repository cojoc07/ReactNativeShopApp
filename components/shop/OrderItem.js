import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CartItem from "./CartItem";
import Colors from "../../constants/colors";
import Card from "../ui/Card";

const OrderItem = (props) => {
  const [detailsShown, setDetailsShown] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>

      <Button
        title={detailsShown ? "Mai puțin" : "Mai mult"}
        color={Colors.primaryColor}
        onPress={() => setDetailsShown((prevState) => !prevState)}
      />

      {detailsShown && (
        <View>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              canDelete={false}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
});

export default OrderItem;
