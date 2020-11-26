import React, { useEffect } from "react";

import {
  Alert,
  Platform,
  Button,
  FlatList,
  Image,
  Text,
  StyleSheet,
  View,
} from "react-native";
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

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            title="Editează produs"
            color={Colors.accentColor}
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            title="Șterge produs"
            color={Colors.accentColor}
            onPress={() => deleteProductHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 20,
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});

export default UserProductsScreen;
