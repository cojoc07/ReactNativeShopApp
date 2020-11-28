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

import { Chip } from "react-native-paper";

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  const dispatch = useDispatch();
  const oraData = moment(selectedProduct.createDate).format(
    "Do MMM YYYY, HH:mm"
  );
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

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              icon="information"
              style={{ backgroundColor: Colors.primaryColor }}
              textStyle={{ color: "white" }}
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              {oraData}
            </Chip>

            <Chip
              icon="information"
              style={{ backgroundColor: Colors.primaryColor }}
              textStyle={{ color: "white" }}
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              Vânzător
            </Chip>
          </View>
        </View>
        <Text style={styles.price}>{selectedProduct.price.toFixed(2)} Lei</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
        <View style={styles.actions}>
          <Button
            color={Colors.primaryColor}
            title="Adaugă în coș"
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          />
        </View>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
