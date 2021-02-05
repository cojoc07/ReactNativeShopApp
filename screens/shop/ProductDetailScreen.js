<<<<<<< HEAD
import React, { useRef, useMemo, useCallback, useState } from "react";
import moment from "moment";
import { Button as Button2 } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
=======
import React from "react";
import moment from "moment";
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a

import {
  View,
  Text,
  Image,
  Button,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Colors from "../../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

import { Chip } from "react-native-paper";
<<<<<<< HEAD
import BottomSheet from "@gorhom/bottom-sheet";
=======
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [quantity, setQuantity] = useState(1);
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  const isInCart = useSelector((state) => {
    //state.cart.items.find((prod) => prod.id === productId);
  });

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [-50, "100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const dispatch = useDispatch();
<<<<<<< HEAD

  const oraData = moment(selectedProduct.createDate).format(
    "Do MMM YYYY, HH:mm"
  );

=======
  const oraData = moment(selectedProduct.createDate).format(
    "Do MMM YYYY, HH:mm"
  );
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <StatusBar
          translucent={true}
          barStyle={Platform.OS == "android" ? "auto" : "dark-content"}
        />

        <Image
          style={styles.image}
          resizeMode="cover"
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
<<<<<<< HEAD
=======
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
              onPress={() =>
                Alert.alert(
                  "Informatii",
                  `Acest produs este vândut de utilizatorul ${selectedProduct.soldBy}`
                )
              }
            >
              {selectedProduct.soldBy.substring(
                0,
                selectedProduct.soldBy.indexOf("@")
              )}
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
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a
            }}
          >
            <Chip
              icon="information"
              style={{ backgroundColor: Colors.primaryColor }}
              textStyle={{ color: "white" }}
              mode="outlined"
              onPress={() => bottomSheetRef.current.expand()}
            >
              {oraData}
            </Chip>

            <Chip
              icon="information"
              style={{ backgroundColor: Colors.primaryColor }}
              textStyle={{ color: "white" }}
              mode="outlined"
              onPress={() =>
                Alert.alert(
                  "Informatii",
                  `Acest produs este vândut de utilizatorul ${selectedProduct.soldBy}`
                )
              }
            >
              {selectedProduct.soldBy.substring(
                0,
                selectedProduct.soldBy.indexOf("@")
              )}
            </Chip>
          </View>
        </View>
<<<<<<< HEAD

        <Text style={styles.price}>{selectedProduct.price.toFixed(2)} Lei</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
=======
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a
      </ScrollView>
      <View style={styles.actions}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
          }}
        >
          <Button2
            icon={<Icon name="minus" size={24} color="white" />}
            buttonStyle={{ backgroundColor: Colors.primaryColor, width: 38 }}
            disabled={quantity == 1}
            disabledStyle={{ backgroundColor: "#bdbdbd" }}
            onPress={() => setQuantity(quantity - 1)}
          />

          <View
            style={{
              width: 44,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22 }}>{quantity.toString()}</Text>
          </View>

          <Button2
            icon={<Icon name="plus" size={24} color="white" />}
            buttonStyle={{
              backgroundColor: Colors.primaryColor,
              width: 38,
            }}
            onPress={() => setQuantity(quantity + 1)}
          />
        </View>

        <Button2
          icon={<Icon name="cart-plus" size={24} color="white" />}
          title={isInCart ? "Actualizează" : " Adaugă în coș"}
          buttonStyle={{
            backgroundColor: Colors.primaryColor,
            width: 160,
            marginLeft: 60,
          }}
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct, quantity));
          }}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        animationDuration={800}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleComponent={null}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
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
    marginBottom: 100,
  },
  actions: {
<<<<<<< HEAD
    padding: 5,
    backgroundColor: "#f2f2f2",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
=======
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 15,
    marginHorizontal: 20,
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a
    alignItems: "center",
  },
});

export default ProductDetailScreen;
