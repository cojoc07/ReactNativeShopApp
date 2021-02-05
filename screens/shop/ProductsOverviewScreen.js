import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StatusBar,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
<<<<<<< HEAD
import * as Animatable from "react-native-animatable";
import TouchableScale from "react-native-touchable-scale";
=======
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a
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

<<<<<<< HEAD
  const renderElement = (item, index) => {
    console.log("indexul: " + index);
    return (
      <Animatable.View
        duration={1200}
        delay={500 + index * 200}
        animation="zoomIn"
      >
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          style={{ width: 150 }}
          onSelect={() => selectItemHandler(item.id, item.title)}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableScale
              style={styles.touchableButton}
              tension={20}
              activeScale={0.8}
              onPress={() => selectItemHandler(item.id, item.title)}
            >
              <Text style={{ fontFamily: "open-sans", color: "#FFF" }}>
                Detalii
              </Text>
            </TouchableScale>
            <TouchableScale
              style={styles.touchableButton}
              tension={20}
              activeScale={0.8}
              onPress={() => dispatch(cartActions.addToCart(item, 1))}
            >
              <Text style={{ fontFamily: "open-sans", color: "#FFF" }}>
                În coș
              </Text>
            </TouchableScale>
          </View>

          {/*  <Button
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
      /> */}
        </ProductItem>
      </Animatable.View>
    );
  };

=======
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a
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
        numColumns={2}
<<<<<<< HEAD
        renderItem={({ item, index }) => renderElement(item, index)}
=======
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            style={{ width: 150 }}
            onSelect={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() =>
                  selectItemHandler(itemData.item.id, itemData.item.title)
                }
              >
                <Text style={{ fontFamily: "open-sans", color: "#FFF" }}>
                  Detalii
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableButton}
                onPress={() => dispatch(cartActions.addToCart(itemData.item))}
              >
                <Text style={{ fontFamily: "open-sans", color: "#FFF" }}>
                  În coș
                </Text>
              </TouchableOpacity>
            </View>

            {/*  <Button
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
            /> */}
          </ProductItem>
        )}
>>>>>>> 968011327f9785bbb767ceac899a99f8ac5f294a
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
  touchableButton: {
    backgroundColor: Colors.accentColor,
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 30,
    justifyContent: "center",
  },
});

export default ProductsOverviewScreen;
