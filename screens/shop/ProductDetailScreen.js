import React from "react";
import moment from "moment";

import {
  View,
  Text,
  Image,
  Button,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Colors from "../../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  const dispatch = useDispatch();
  const oraData =
    "Adăugat pe " +
    moment(selectedProduct.createDate).format("Do MMMM YYYY, HH:mm");
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar
          translucent={true}
          barStyle={Platform.OS == "android" ? "auto" : "dark-content"}
        />
        <Image
          style={styles.image}
          source={{ uri: selectedProduct.imageUrl }}
        />

        <View>
          <Text>{oraData}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            color={Colors.primaryColor}
            title="Adaugă în coș"
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          />
        </View>
        <Text style={styles.price}>{selectedProduct.price.toFixed(2)} Lei</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
