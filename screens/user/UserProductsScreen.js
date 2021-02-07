import React, { useEffect } from "react";

import {
  Alert,
  Platform,
  Button,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import * as Animatable from "react-native-animatable";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/colors";

const UserProductsScreen = ({ route, navigation }) => {
  //se creaza functia dispatch
  const dispatch = useDispatch();

  const userProducts = useSelector((state) => state.products.userProducts);
  const editProductHandler = (id) => {
    navigation.navigate("EditProductScreen", {
      productId: id,
    });
  };

  //cand se focuseaza acest screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      console.log("s-a focusat ecranul Admin");
    });

    return unsubscribe;
  }, [navigation]);

  const deleteProductHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this product?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      },
    ]);
  };

  {
    if (userProducts.length == 0) {
      return (
        <View style={styles.centered}>
          <Image
            source={require("../../assets/shelves.png")}
            style={{ height: 150, width: 150 }}
          />
          <Text style={styles.label}>Nu ai niciun produs la vânzare.</Text>
          <Text>Adaugă un produs astăzi !</Text>
        </View>
      );
    }
  }

  const renderElement = (item, index) => (
    <Animatable.View
      duration={1200}
      delay={500 + index * 200}
      animation="fadeInUp"
    >
      <ProductItem
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        onSelect={() => {
          editProductHandler(item.id);
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.touchableButton,
              backgroundColor: Colors.primaryColor,
            }}
            onPress={() => editProductHandler(item.id, item.title)}
          >
            <Text style={{ fontFamily: "open-sans", color: "#FFF" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => deleteProductHandler(item.id)}
          >
            <Text style={{ fontFamily: "open-sans", color: "#FFF" }}>
              Șterge
            </Text>
          </TouchableOpacity>
        </View>
      </ProductItem>
    </Animatable.View>
  );

  return (
    <FlatList
      data={userProducts}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => renderElement(item, index)}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableButton: {
    backgroundColor: Colors.accentColor,
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 30,
    justifyContent: "center",
  },
  label: {
    marginTop: 20,
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});

export default UserProductsScreen;
