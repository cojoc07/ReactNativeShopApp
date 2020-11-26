import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StatusBar,
  Text,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/colors";

const ProductsOverviewScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);

  //se creaza functia dispatch
  const dispatch = useDispatch();

  //se creaza o functie
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && products.length == 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 16 }}>
          No products available. Start adding some today.
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error has occurred.</Text>
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
        data={products}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          >
            <Button
              title="Detalii"
              color={Colors.accentColor}
              onPress={() =>
                selectItemHandler(itemData.item.id, itemData.item.title)
              }
            />
            <Button
              title="Adaugă în coș"
              color={Colors.accentColor}
              onPress={() => dispatch(cartActions.addToCart(itemData.item))}
            />
          </ProductItem>
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

export default ProductsOverviewScreen;
