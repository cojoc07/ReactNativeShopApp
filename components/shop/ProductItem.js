import React from "react";
import {
  Button,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from "react-native";

import Card from "../ui/Card";
const windowWidth = Dimensions.get("window").width;

const ProductItem = (props) => {
  let TouchableComponent =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View style={{ height: "100%" }}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>

            <Text numberOfLines={1} style={styles.title}>
              {props.title}
            </Text>
            <Text style={styles.price}>
              {props?.price?.toFixed(2)}{" "}
              {props.price < 2 ? (props.price < 1 ? "Lei" : "Leu") : "Lei"}
            </Text>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    width: windowWidth / 2 - 15,
    justifyContent: "space-between",
    height: 250,
    marginVertical: 15,
    marginHorizontal: 7.5,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },

  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    width: "100%",
    height: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
    marginHorizontal: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 20,
  },
});

export default ProductItem;
